const wishlistService = require('../services/wishlist-service');
const { sequelize } = require('../models');

exports.getWishlistByUserId = async (req, res, next) => {
  try {
      const { id } = req.params
      const result = await wishlistService.getWishlistByUserId(id)
      res.json(result)
  } catch (err) {
      next(err)
  }
}

exports.getProductIdWishlistByUserId = async (req, res, next) => {
  try {
      const { id } = req.params
      const result = await wishlistService.getProductIdWishlistByUserId(id)
      console.log("rusult")
      const pdArrId = result.map(item => item?.Product?.id)
      res.json(pdArrId)
  } catch (err) {
      next(err)
  }
}

exports.updateWishlist = async (req, res, next) => {
    try {
        const {userId, productId} = req.body;
        const existWishlist = await wishlistService.checkUserWishlist(userId, productId)
        if(!!existWishlist) {
          const result = await wishlistService.deleteWishlist(userId, productId)
          res.json(result)
        } else {
          const result = await wishlistService.addWishlist(req.body)
          res.json(result)
        }
    } catch (err) {
        next(err)
    }
}


