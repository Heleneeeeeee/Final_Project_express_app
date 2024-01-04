const { HolidaysVoucher, User, Request, sequelize} = require('../db/sequelizeSetup')
const {UniqueConstraintError, ValidationError, Sequelize} = require ('sequelize')

const findAllHolidaysVouchers = (req, res) => {
    HolidaysVoucher.findAll({ include:Request })
    .then((results) => {
        res.json(results)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
}

const findHolidaysVoucherByPk = (req, res) => {
    HolidaysVoucher.findByPk(parseInt(req.params.id))
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

const createHolidaysVoucher = (req, res) => {
    User.findOne({ where: { username: req.username} })
        .then(user => {
            if(!user){
                return res.status(404).json({message:`L'utilisateur n'a pas été trouvé`})
            }
            const newHolidaysVoucher = { ...req.body, UserId:user.id }

            HolidaysVoucher.create(newHolidaysVoucher)
                .then((holidaysVoucher) => {
                    res.status(201).json({ message: 'Le chèque vacances a bien été créé.', data: holidaysVoucher })
                    console.log(holidaysVoucher)
                })
                .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `Le chèque vacances n'a pas pu être créé.`, data: error.message })
            })
            })
        }

const updateHolidaysVoucher = (req, res) => {
    HolidaysVoucher.findByPk(req.params.id)
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

const deleteHolidaysVoucher = (req, res) => {
    HolidaysVoucher.findByPk(req.params.id)
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

module.exports = {findAllHolidaysVouchers, createHolidaysVoucher, findHolidaysVoucherByPk, updateHolidaysVoucher, deleteHolidaysVoucher}

