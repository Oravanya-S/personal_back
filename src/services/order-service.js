const {Product, Cart, Color, Model, Order, OrderItem} = require('../models')
const { Op } = require('sequelize')

exports.getOrderByUserId = (id) =>{ 
    return Order.findAll({
        where:{
            userId: id
        },
        order: [["createdAt", "DESC"]],
        include: [{
            model: OrderItem,
            include: [{
                model: Product,
                include: [{
                    model: Model
                }, {
                    model: Color
                }]
            }
            ]
        }]
})}