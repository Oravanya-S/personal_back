const { GroupColor, BagType, Color } = require('../models')
exports.getGroupColor = () => GroupColor.findAll({
    // order: [["name", "DESC"]]
})
exports.getColors = () => Color.findAll({
    include: { model: GroupColor },
    // order: [
    //     [{ model: GroupColor }, 'name'],
    // ]
})
exports.getBagTypes = () => BagType.findAll()

