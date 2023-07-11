const express = require('express');

const wishlistController = require('../controllers/wishlist-controller')

const router = express.Router()

router.post('/', wishlistController.updateWishlist)
router.get('/products/:id', wishlistController.getProductIdWishlistByUserId)
router.get('/:id', wishlistController.getWishlistByUserId)

module.exports = router;