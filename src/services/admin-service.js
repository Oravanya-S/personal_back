const { GroupColor, BagType, Color, Model, Product } = require('../models')

//GroupColor
exports.getGroupColor = () => GroupColor.findAll({
    order: [["createdAt", "DESC"]]
})

//Color
exports.getColors = () => Color.findAll({
    include: { model: GroupColor },
    order: [['createdAt', 'DESC']]
})

exports.AddColor = color => Color.create(color)
exports.UpdateColor = (id, payload) => Color.update(
    payload, {
        where:{
            id: id
        }
    })
exports.DeleteColor = (id) => Color.destroy({
        where:{
            id: id
        }
    })

//Bagtypes
exports.getBagTypes = () => BagType.findAll()
exports.AddBagType = bagtype => BagType.create(bagtype)
exports.UpdateBagtype = (id, payload) => BagType.update(
    payload, {
    where:{
        id: id
    }
})

exports.DeleteBagtype = (id) => BagType.destroy({
    where:{
        id: id
    }
})

//Models
exports.getModels = () => Model.findAll({
    where: {
        status: 1
    },
    order: [['createdAt', 'DESC']]
})

exports.AddModel = model => Model.create(model)
exports.UpdateModel = (id, payload) => Model.update(
    payload, {
        where:{
            id: id
        }
    })
exports.DeleteModel = (id, payload) => Model.update(
    payload, {
        where:{
            id: id
        }
    })

//Products
exports.getProducts = () => Product.findAll({
    where: {
        status: 1
    },
    include: [{
        model: Model,
    }, {
        model: Color
    }],
    order: [['createdAt', 'DESC']]
})

exports.AddProduct = product => Product.create(product)
exports.UpdateProduct = (id, payload) => Product.update(
    payload, {
        where:{
            id: id
        }
    })
exports.DeleteProduct = (id, payload) => Product.update(
    payload, {
        where:{
            id: id
        }
    })





