const express = require('express')
const router = express.Router()
const {findAllRequests, createRequest, findRequestByPk, updateRequest, deleteRequest} = require ('../controllers/requestControllers')
const {protect} = require('../controllers/authControllers')
const {Request} = require ('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllRequests)
    .post(protect, createRequest)

router
    .route('/:id')
    .get(findRequestByPk)
    .put(protect, updateRequest)
    .delete(protect, deleteRequest)
   

module.exports = router