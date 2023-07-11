const userService = require('../services/user-service')


exports.UpdateUser = async (req, res, next) => {
    try {
        const id = req.user.id
        const payload = req.body
        const result = await userService.UpdateUser(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}