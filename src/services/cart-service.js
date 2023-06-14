const {Product, Cart, Color, Model} = require('../models')
const { Op } = require('sequelize')

exports.getCartByUserId = (id) =>{ 
    return Cart.findAll({
        where:{
            userId: id
        },
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



