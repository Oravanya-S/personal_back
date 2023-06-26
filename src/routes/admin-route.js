const express = require('express')

const adminController = require('../controllers/admin-controller')
// const upload = require('../middlewares/upload')
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

router.get('/products', adminController.getProducts)
router.post('/product', adminController.AddProduct)
router.put('/product/:id', adminController.UpdateProduct)
router.delete('/product/:id', adminController.DeleteProduct)

module.exports = router;
// router.patch(
//     '/image/:id',
//     upload.fields([
//       { name: 'image', maxCount: 1 },
//     ]),
//     adminController.uploadImage
// );




