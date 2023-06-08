const { BagType, Model, Product, Color, GroupColor } = require('../models')
const { Op } = require('sequelize')

exports.getModelsByBagType = (bagid) =>{ 
    // const where = {}
    // if (body.id) {
    //     where.id = body.id
    // }
    // console.log(id)
    
    return Model.findAll({
        include: [{
            model: BagType,
            where:{
                id: bagid
            }
        }, {
            model: Product
        }]
})}


