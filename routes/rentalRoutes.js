const express = require('express')
const router = express.Router()
const {findAllRentals, createRental, findRentalByPk, updateRental, deleteRental} = require ('../controllers/rentalControllers')
const {protect} = require('../controllers/authControllers')


router
    .route('/')
    .get(findAllRentals)
    .post(protect, createRental)

router
    .route('/:id')
    .get(findRentalByPk)
    .put(protect, updateRental)
    .delete(protect, deleteRental)
   

module.exports = router