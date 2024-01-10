const { ValidationError } = require('sequelize')
const { Request, User, Rental, HolidaysVoucher, Leisure} = require('../db/sequelizeSetup')


const findAllRequests = (req, res) => {
    Request.findAll({
        include: [User, Rental, HolidaysVoucher, Leisure]
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findRequestByPk = (req, res) => {
    return res.json({ message: `find by pk` })
}

const createRequest = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `Utilisateur non trouvé.` })
            }
            return Request.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `Demande créé.`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

const updateRequest = (req, res) => {
    Request.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                return result.update(req.body)
                .then (() => {
                    res.status(201).json({ message: 'La demande a bien été mise à jour.', data: result })
                }) 
        } else {
            res.status(404).json({ message: `Aucune demande à mettre à jour n'a été trouvé.`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
    })
}

const deleteRequest = (req, res) => {
    Request.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                return result.destroy()
                    .then(() => {
                        res.json({ message: `La demande a bien été supprimé.`, data: result})
                    })
                    
            } else {
               
                res.status(404).json({ message: `Aucune demande trouvée`, data: error.message})
            }

        })
        
        .catch((error) => {
            res.status(500).json({ message: `La requête n'a pas aboutie.` })

        })
    
}

module.exports = {findAllRequests, findRequestByPk, createRequest, updateRequest, deleteRequest}