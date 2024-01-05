const { Rental, User, Request, sequelize} = require('../db/sequelizeSetup')
const {UniqueConstraintError, ValidationError, Sequelize} = require ('sequelize')

const findAllRentals = (req, res) => {
    Rental.findAll({ include:Request })
    .then((results) => {
        res.json(results)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
}

const findRentalByPk = (req, res) => {
    Rental.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Une location a été trouvée.', data: result })
            } else {
                res.status(404).json({ message: `Aucune location n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createRental = (req, res) => {
    User.findOne({ where: { username: req.username} })
        .then(user => {
            if(!user){
                return res.status(404).json({message:`L'utilisateur n'a pas été trouvé`})
            }
            const newRental = { ...req.body, UserId:user.id }

            Rental.create(newRental)
                .then((rental) => {
                    res.status(201).json({ message: 'La location a bien été créé.', data: rental })
                    console.log(rental)
                })
                .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `La location n'a pas pu être créé.`, data: error.message })
            })
            })
        }

const updateRental = (req, res) => {
    Rental.findByPk(req.params.id)
    .then ((result) =>{
        if (result){
            return result.update(req.body)
            .then (() => {
                res.status(201).json({ message: 'La location a bien été mise à jour.', data: result })
            }) 
    } else {
        res.status(404).json({ message: `Aucune location à mettre à jour n'a été trouvé.`, data: error.message })
    } 
})
.catch(error => {
    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
})
}

const deleteRental = (req, res) => {
    Rental.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                return result.destroy()
                    .then(() => {
                        res.json({ message: `La location a bien été supprimée.`, data: result})
                    })
                    
            } else {
               
                res.status(404).json({ message: `Aucune location trouvée`, data: error.message})
            }

        })
        
        .catch((error) => {
            res.status(500).json({ message: `La requête n'a pas aboutie.` })

        })
    
}

module.exports = {findAllRentals, createRental, findRentalByPk, updateRental, deleteRental}

