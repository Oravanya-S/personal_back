const modelService = require('../services/model-service')

exports.getModelsByBagType = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await modelService.getModelsByBagType(id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await modelService.getProductById(id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}





