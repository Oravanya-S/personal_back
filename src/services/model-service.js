const { BagType, Model, Product, Color, GroupColor } = require('../models')

exports.getModelsByBagType = (id) =>{ 
    return Product.findAll({
        where:{
            status: 1
        },
        order: [['createdAt', 'DESC']],
        include: [{
            model: Model,
            where : {
                status: 1
            },
            include: [{
                model: BagType,
                where: {
                    id: id
                }
            }]
        },
        {
            model: Color
        }
        ]
})}


