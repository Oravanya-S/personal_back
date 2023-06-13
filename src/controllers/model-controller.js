const modelService = require('../services/model-services')

exports.getModelsByBagType = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await modelService.getModelsByBagType(id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}





