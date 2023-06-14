const express = require('express');

const cartController = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()


router.post('/', cartController.addCart)
router.get('/:id', cartController.getCartByUserId)


module.exports = router;