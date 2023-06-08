const modelService = require('../services/model-services')

exports.getModelsByBagType = async (req, res, next) => {
    try {
        const { bagtypeid } = req.query
        const result = await modelService.getModelsByBagType( bagtypeid )
        res.json(result)
    } catch (err) {
        next(err)
    }
}





