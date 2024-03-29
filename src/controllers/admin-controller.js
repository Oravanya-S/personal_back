const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const adminService = require('../services/admin-service')
const modelService = require('../services/model-service')
const uploadService = require("../services/upload-service");
const { Product, sequelize } = require("../models");
const createError = require('../utils/create-error');
const { QueryTypes } = require("sequelize");
const stripe = require("stripe")(
    process.env.STRIPE_KEY
);

exports.getGroupColorWithColor = async (req, res, next) => {
    try {
        const result = await adminService.getGroupColorWithColor()
        res.json(result)
    } catch (err) {
        next(err)
    }
}
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

exports.AddColour = async (req, res, next) => {
    try {
        const value = req.body
        const result = await adminService.AddColour(value)
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

exports.UpdateColour = async (req, res, next) => {
    try {
        const {id} = req.params
        const payload = req.body
        console.log("payload", payload)
        const result = await adminService.UpdateColour(id, payload)
        console.log("result", result)
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

exports.DeleteColour = async (req, res, next) => {
    try {
        const {id} = req.params
        console.log("DDDDdddddd", id)
        const result = await adminService.DeleteColour(id)
        console.log("res", result)
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
        console.log("value of add product", value)

        if (!req.file) {
            createError("image is required (back)")
        }
        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.image = result.secure_url;
            console.log(result.secure_url)
        }
        const product = await adminService.AddProduct(value)
        const productById = await modelService.getProductById(product.id)
        const results = await stripe.products.create({
            name: `${productById.Model.name} ${productById.Color.name}`,
            default_price_data: {
              currency: "THB",
              unit_amount_decimal: Number(value.price*100),
            },
            images: [product.image],
          });
      
          const resultStripe = await adminService.UpdateProduct(
            { id: product.id, 
              productDefaultPrice: results.default_price},
          );
          
          const lastResult = {...product.dataValues, productDefaultPrice: results.default_price}
          console.log(lastResult)

        res.json(lastResult)
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


exports.getDashboard = async (req, res, next) => {
    try {
        const {startDate, endDate} = req.query
        const dashboardGroupColor = await adminService.getDashboardGroupColor(startDate, endDate)
        const dashboardModel = await adminService.getDashboardModel(startDate, endDate)
        const dashboardEarning = await adminService.getDashboardEarning(startDate, endDate)
        const dashboardNumBag = await adminService.getDashboardNumBag(startDate, endDate)
        const dashboardCart = await adminService.getDashboardCart(startDate, endDate)
        const dashboardFav = await adminService.getDashboardFav(startDate, endDate)
        res.json({dashboardGroupColor, dashboardEarning, dashboardNumBag, dashboardCart, dashboardFav, dashboardModel})
    } catch (err) {
        next(err)
    }
}

