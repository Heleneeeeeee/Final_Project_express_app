const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const SECRET_KEY = require ('../configs/tokenData')

const login = (req, res) => {
    User.findOne({ where: { username: req.body.username} })
        .then ((result)=>{
            if (!result) return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.`})
            bcrypt.compare(req.body.password, result.password)
                .then ((isValid) => {
                    if (!isValid) {
                        return res.status(401).json({message: `Le mot de passe n'est pas valide`})
                    }
                   const token = jwt.sign({
                        data:result.username
                   }, SECRET_KEY, {expiresIn:'10h'});

                   res.json({message:`Login réussi`, data: token})
                })
                .catch(error => {
                    console.log(error.message)
                })
        })

        .catch((error) => {
            res.status(500).json({data: error.message})
        })

}

const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data;
            next()
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
}

const restrict = (req, res, next) => {
    User.findOne({
        where: {
            username: req.username
        }
    })
        .then(user => {
            Role.findByPk(user.RoleId)
                .then(role => {
                    if (role.label === 'admin') {
                        next()
                    } else {
                        res.status(403).json({ message: `Droits insuffisants` })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        })
        .catch(error => {
            console.log(error)
        })
}




module.exports = { login, protect, restrict }
