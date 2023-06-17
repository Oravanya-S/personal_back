const express = require('express');

const orderController = require('../controllers/order-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()


router.get('/:id', orderController.getOrderByUserId)


module.exports = router;
