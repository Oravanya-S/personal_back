const { GroupColor, BagType, Color } = require('../models')
exports.getGroupColor = () => GroupColor.findAll({
    // order: [["name", "DESC"]]
})
exports.getColor = () => Color.findAll({
    include: { model: GroupColor },
    // order: [
    //     [{ model: GroupColor }, 'name'],
    // ]
})
exports.getBagType = () => BagType.findAll()

