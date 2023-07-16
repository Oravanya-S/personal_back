const cartService = require('../services/cart-service');
const uploadService = require("../services/upload-service")
const { Payment, sequelize } = require('../models');

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

exports.checkout = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const {userId} = req.body;
        const allItem = await cartService.getCartByUserId(userId)
        const cleanAllItem = JSON.parse(JSON.stringify(allItem))
        const order = await cartService.createOrder(req.body, { transaction: t } )
        const orderId = order.id
        for(let el of cleanAllItem) {
            const result = await cartService.createOrderItem({"orderId": orderId, "quantity": el.quantity, "productId": el.productId}, { transaction: t })
            console.log(result)
        }
        const deleteAllCart = await cartService.deleteAllCart(userId, { transaction: t })
        await t.commit();
        res.json(deleteAllCart)
    } catch (err) {
        await t.rollback();
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

//create payment
exports.createPayment = async (req, res, next) => {
  
    try {
      const value  = req.body;
      console.log('first', value)
      console.log('---------------------------------------',req.file)
      const result = await uploadService.upload(req.file.path);
      value.image = result.secure_url;
      value.userId = req.user.id;
      const payment = await Payment.create(value)
      console.log('########',value)
      res.status(200).json(payment)
  
    } catch (err) {
      next(err);
    }
  
  };



