const express = require('express');

const userController = require('../controllers/user-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const router = express.Router()


router.put('/profile',authenticateMiddleware, userController.UpdateUser)
module.exports = router;
