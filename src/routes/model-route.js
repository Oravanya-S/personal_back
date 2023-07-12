const express = require('express')

const modelController = require('../controllers/model-controller')

const router = express.Router()

router.get('/:id', modelController.getModelsByBagType)
router.get('/product/:id', modelController.getProductById)

module.exports = router;