const express = require('express')
const router = express.Router()
const {findAllLeisures, findLeisureByPk, createLeisure, createLeisureWithImg, updateLeisure, deleteLeisure} = require ('../controllers/leisureControllers')
const {protect} = require('../controllers/authControllers')
const multer = require('../middleware/multer-config');


router
    .route('/')
    .get(findAllLeisures)
    .post(protect, createLeisure)

router
    .route('/withImg')
    .post(protect, multer, createLeisureWithImg)
        

router
    .route('/:id')
    .get(findLeisureByPk)
    .put(protect, updateLeisure)
    .delete(protect, deleteLeisure)
   

module.exports = router