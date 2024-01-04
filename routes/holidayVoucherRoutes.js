const express = require('express')
const router = express.Router()
const {findAllHolidaysVouchers, createHolidaysVoucher, findHolidaysVoucherByPk, updateHolidaysVoucher, deleteHolidaysVoucher} = require ('../controllers/holidayVoucherControllers')
const {protect} = require('../controllers/authControllers')


router
    .route('/')
    .get(findAllHolidaysVouchers)
    .post(protect, createHolidaysVoucher)

router
    .route('/:id')
    .get(findHolidaysVoucherByPk)
    .put(protect, updateHolidaysVoucher)
    .delete(protect, deleteHolidaysVoucher)
   

module.exports = router