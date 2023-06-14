const {Product, Cart} = require('../models')
const { Op } = require('sequelize')

exports.getCartByUserId = (id) =>{ 
    return Cart.findAll({
        where:{
            userId: id
        }
})}

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



