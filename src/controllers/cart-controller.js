const cartService = require('../services/cart-service')

exports.addCart = async (req, res, next) => {
    try {
        const {userId, productId} = req.body;
        const existcart = await cartService.checkUserHaveCart(userId, productId)
        if(!!existcart) {
          const payload = {"quantity": existcart.quantity+1}
          const result = await cartService.UpdateCart(payload, userId, productId)
          res.json(result)
        } else {
          const result = await cartService.AddCart(req.body)
          res.json(result)
        }
    } catch (err) {
        next(err)
    }
}

exports.updateQuantity = async (req, res, next) => {
    try {
        const {userId, productId, quantity} = req.body;
        const payload = {"quantity": quantity}
        const result = await cartService.updateQuantity(payload, userId, productId)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getCartByUserId = async (req, res, next) => {
  try {
      const { id } = req.params
      const result = await cartService.getCartByUserId(id)
      res.json(result)
  } catch (err) {
      next(err)
  }
}


exports.DeleteCart = async (req, res, next) => {
  try {
      const {id} = req.params
      const result = await cartService.DeleteCart(id)
      res.json(result)
  } catch (err) {
      next(err)
  }
}


