const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const adminService = require('../services/admin-service')
const uploadService = require("../services/upload-service");
const { Product } = require("../models");
const createError = require('../utils/create-error');

// exports.uploadImage = async (req, res, next) => {
//     const {id} = req.params
//     try {
//       if (!req.files) {
//         createError('Image is required', 400);
//       }
  
//       const updateValue = {};
//       if (req.files.image) {
//         const result = await uploadService.upload(req.files.image[0].path);
//         updateValue.image = result.secure_url;
//       }
  
//       await Product.update(updateValue, { where: { id: id } });
//       res.status(200).json(updateValue);
//     } catch (err) {
//       next(err);
//     } finally {
//       if (req.files.image) {
//         fs.unlinkSync(req.files.image[0].path);
//       }
//     }
//   };

exports.getGroupColor = async (req, res, next) => {
    try {
        const result = await adminService.getGroupColor()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

//colors
exports.getColors = async (req, res, next) => {
    try {
        const result = await adminService.getColors()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.AddColor = async (req, res, next) => {
    try {
        const value = req.body
        const result = await adminService.AddColor(value)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.UpdateColor = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = req.body
        const result = await adminService.UpdateColor(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.DeleteColor = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await adminService.DeleteColor(id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

//Bagtypes

exports.AddBagType = async (req, res, next) => {
    try {
        const value = req.body
        const result = await adminService.AddBagType(value)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.UpdateBagtype = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = req.body
        const result = await adminService.UpdateBagtype(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.DeleteBagtype = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await adminService.DeleteBagtype(id)
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

//models
exports.getModels = async (req, res, next) => {
    try {
        const result = await adminService.getModels()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.AddModel = async (req, res, next) => {
    try {
        const value = req.body
        const isModelExist = await adminService.checkModelExist(value.name);
        if (isModelExist) {
            createError('model already in use', 400);
        }
        const result = await adminService.AddModel(value)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.UpdateModel = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = req.body
        const result = await adminService.UpdateModel(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.DeleteModel = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = {"status": 0}
        const result = await adminService.DeleteModel(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

//products

exports.getProducts = async (req, res, next) => {
    try {
        const result = await adminService.getProducts()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

exports.AddProduct = async (req, res, next) => {
    try {
        const value = req.body
        console.log("sssssssdddddddddddd", value)
        if (!req.file) {
            createError("image is required (back)")
        }
        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.image = result.secure_url;
            console.log(result.secure_url)
        }
        const result = await adminService.AddProduct(value)
        res.json(result)
    } catch (err) {
        next(err)
    } finally {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
    }
}

exports.UpdateProduct = async (req, res, next) => {
    try {
        // const {id} = req.params
        const payload = req.body
        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            payload.image = result.secure_url;
            console.log(result.secure_url)
        }
        const result = await adminService.UpdateProduct(payload)
        const resultChange = await adminService.getProductById(payload.id)
        res.json(resultChange)
    } catch (err) {
        next(err)
    } finally {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
    }
}

exports.DeleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = {"status": 0}
        const result = await adminService.DeleteProduct(id, payload)
        res.json(result)
    } catch (err) {
        next(err)
    }
}














// exports.uploadImage = async (req, res, next) => {
//     try {
//       if (!req.files.profileImage && !req.files.coverImage) {
//         createError('profile image or cover image is required');
//       }
  
//       const updateValue = {};
//       if (req.files.profileImage) {
//         const result = await uploadService.upload(req.files.profileImage[0].path);
//         updateValue.profileImage = result.secure_url;
//       }
//       if (req.files.coverImage) {
//         const result = await uploadService.upload(req.files.coverImage[0].path);
//         updateValue.coverImage = result.secure_url;
//       }
  
//       await User.update(updateValue, { where: { id: req.user.id } });
//       res.status(200).json(updateValue);
//     } catch (err) {
//       next(err);
//     } finally {
//       if (req.files.profileImage) {
//         fs.unlinkSync(req.files.profileImage[0].path);
//       }
//       if (req.files.coverImage) {
//         fs.unlinkSync(req.files.coverImage[0].path);
//       }
//     }
//   };
