const express = require('express');

const userController = require('../controllers/user-controller')
const authController = require('../controllers/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const router = express.Router()


router.put('/profile',authenticateMiddleware, userController.UpdateUser)
router.put('/changepassword',authenticateMiddleware, authController.changePassword)
module.exports = router;
