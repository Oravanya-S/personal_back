const {Product, Cart, Color, Model, Order, OrderItem} = require('../models')

exports.getCartByUserId = (id) =>{ 
    return Cart.findAll({
        where:{
            userId: id
        },
        order: [['createdAt', 'DESC']],
        include: [{
            model: Product,
            include: [{
                model: Color,
            },
            {
                model: Model
            }
            ]
        }]
})}

exports.updateQuantity = (payload, userId, productId) => Cart.update(
    payload,{
        where:{
            userId: userId,
            productId: productId
        }
})

exports.checkUserHaveCart = (userId, productId) =>{ 
    return Cart.findOne({
        where:{
            userId: userId,
            productId: productId
        },
})}

exports.AddCart = cart => Cart.create(cart)
exports.UpdateCart = (payload, userId, productId) => Cart.update(
    payload,{
    where:{
        userId: userId,
        productId: productId
    },
})

exports.DeleteCart = (id) => Cart.destroy({
    where:{
        id: id
    }
})

exports.createOrder = (order, t) => Order.create(order, t)

exports.createOrderItem = (orderitem, t) => OrderItem.create(orderitem, t)

exports.deleteAllCart = (id) => Cart.destroy({
    where:{
        userId: id
    }
})



