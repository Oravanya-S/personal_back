const express = require('express');

const paymentController = require('../controllers/payment-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.post('/create-payment/:id', authenticateMiddleware, paymentController.createPayment);
router.get('/:id', paymentController.checkPayment);

module.exports = router;