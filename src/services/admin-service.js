const { GroupColor, BagType, Color, Model } = require('../models')

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






