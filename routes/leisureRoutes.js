const express = require('express')
const router = express.Router()
const {findAllLeisures, createLeisure, findLeisureByPk, updateLeisure, deleteLeisure} = require ('../controllers/leisureControllers')
const {protect} = require('../controllers/authControllers')


router
    .route('/')
    .get(findAllLeisures)
    .post(protect, createLeisure)

router
    .route('/:id')
    .get(findLeisureByPk)
    .put(protect, updateLeisure)
    .delete(protect, deleteLeisure)
   

module.exports = router