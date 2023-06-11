const express = require('express')

const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/groupcolor', adminController.getGroupColor)
router.get('/colors', adminController.getColors)
router.post('/color', adminController.AddColor)
router.put('/color/:id', adminController.UpdateColor)
router.delete('/color/:id', adminController.DeleteColor)
router.get('/bagtypes', adminController.getBagTypes)
router.post('/bagtype', adminController.AddBagType)
router.patch('/bagtype/:id', adminController.UpdateBagtype)
router.delete('/bagtype/:id', adminController.DeleteBagtype)

router.get('/models', adminController.getModels)
router.post('/model', adminController.AddModel)
router.put('/model/:id', adminController.UpdateModel)
router.delete('/model/:id', adminController.DeleteModel)

router.patch(
    '/image/:productId',
    authenticate,
    upload.fields([
      { name: 'productImage', maxCount: 3 },
    ]),
    userController.uploadImage
);

module.exports = router;