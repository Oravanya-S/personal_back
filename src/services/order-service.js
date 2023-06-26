const {Product, Cart, Color, Model, Order, OrderItem, User} = require('../models')
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


exports.getOrderAll = () =>{ 
    return Order.findAll({
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
        }, {
            model: User,
        }]
})}