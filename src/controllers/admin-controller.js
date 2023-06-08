const adminService = require('../services/admin-service')

exports.getGroupColor = async (req, res, next) => {
    try {
        const result = await adminService.getGroupColor()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getColors = async (req, res, next) => {
    try {
        const result = await adminService.getColors()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getBagTypes = async (req, res, next) => {
    try {
        const result = await adminService.getBagTypes()
        res.json(result)
    } catch (err) {
        next(err)
    }
}