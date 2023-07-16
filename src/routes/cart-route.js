const express = require('express');
const upload =require('../middlewares/upload')
const cartController = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()


router.post('/', cartController.addCart)
router.get('/:id', cartController.getCartByUserId)
router.patch('/updateQuantity', cartController.updateQuantity)
router.delete('/:id', cartController.DeleteCart)
router.post('/checkout', cartController.checkout)
router.post('/upload',upload.single('paymentUpload'),authenticateMiddleware,cartController.createPayment)



module.exports = router;