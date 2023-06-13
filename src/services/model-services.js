const { BagType, Model, Product, Color, GroupColor } = require('../models')
const { Op } = require('sequelize')

exports.getModelsByBagType = (id) =>{ 
    
    return Model.findAll({
        include: [{
            model: BagType,
            where:{
                id: id
            }
        }, {
            model: Product
        }]
})}


