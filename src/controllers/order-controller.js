const orderService = require('../services/order-service')

exports.getOrderByUserId = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await orderService.getOrderByUserId(id)
        res.json(result)
    } catch (err) {
        next(err)
    }
  }