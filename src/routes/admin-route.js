const express = require('express')

const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/groupcolor', adminController.getGroupColor)
router.get('/colors', adminController.getColors)
router.get('/bagtypes', adminController.getBagTypes)


module.exports = router;