const express = require('express')

const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/groupcolor', adminController.getGroupColor)
router.get('/color', adminController.getColor)
router.get('/bagtype', adminController.getBagType)


module.exports = router;