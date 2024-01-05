const { Leisure, User, Request, sequelize} = require('../db/sequelizeSetup')
const {UniqueConstraintError, ValidationError, Sequelize} = require ('sequelize')

const findAllLeisures = (req, res) => {
    Leisure.findAll({ include:Request })
    .then((results) => {
        res.json(results)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
}

const findLeisureByPk = (req, res) => {
    Leisure.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Un chèque vacances a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun chèque vacances n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createLeisure = (req, res) => {
    User.findOne({ where: { username: req.username} })
        .then(user => {
            if(!user){
                return res.status(404).json({message:`L'utilisateur n'a pas été trouvé`})
            }
            const newLeisure = { ...req.body, UserId:user.id }

            Leisure.create(newLeisure)
                .then((leisure) => {
                    res.status(201).json({ message: 'Le chèque vacances a bien été créé.', data: leisure })
                    console.log(leisure)
                })
                .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `Le chèque vacances n'a pas pu être créé.`, data: error.message })
            })
            })
        }

const updateLeisure = (req, res) => {
    Leisure.findByPk(req.params.id)
    .then ((result) =>{
        if (result){
            return result.update(req.body)
            .then (() => {
                res.status(201).json({ message: 'Le chèque vacances a bien été mis à jour.', data: result })
            }) 
    } else {
        res.status(404).json({ message: `Aucun chèque vacances à mettre à jour n'a été trouvé.`, data: error.message })
    } 
})
.catch(error => {
    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
})
}

const deleteLeisure = (req, res) => {
    Leisure.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                return result.destroy()
                    .then(() => {
                        res.json({ message: `La chèque vacances a bien été supprimé.`, data: result})
                    })
                    
            } else {
               
                res.status(404).json({ message: `Aucun chèque vacances trouvé`, data: error.message})
            }

        })
        
        .catch((error) => {
            res.status(500).json({ message: `La requête n'a pas aboutie.` })

        })
    
}

module.exports = {findAllLeisures, createLeisure, findLeisureByPk, updateLeisure, deleteLeisure}