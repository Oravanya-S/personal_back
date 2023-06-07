const adminService = require('../services/admin-service')

exports.getGroupColor = async (req, res, next) => {
    try {
        const result = await adminService.getGroupColor()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getColor = async (req, res, next) => {
    try {
        const result = await adminService.getColor()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getBagType = async (req, res, next) => {
    try {
        const result = await adminService.getBagType()
        res.json(result)
    } catch (err) {
        next(err)
    }
}