const {Product, Color, Model, Favorite, User} = require('../models')

exports.getWishlistByUserId = (id) =>{ 
    return Favorite.findAll({
        where:{
            userId: id
        },
        include: [
            {
                model: Product,
                where : {
                    status: 1
                },
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Color,
                },
                {
                    model: Model,
                    where : {
                        status: 1
                    }
                }]
            },
        ]
})}

exports.getProductIdWishlistByUserId = (id) =>{ 
    return Favorite.findAll({
        where:{
            userId: id
        },
        include: [
            {
                model: Product,
                where : {
                    status: 1
                },
                order: [['createdAt', 'DESC']],
                include: [
                {
                    model: Model,
                    where : {
                        status: 1
                    }
                }]
            },
        ]
})}

exports.checkUserWishlist = (userId, productId) =>{ 
    return Favorite.findOne({
        where:{
            userId: userId,
            productId: productId
        },
})}

exports.deleteWishlist = (userId, productId) => Favorite.destroy({
    where:{
        userId: userId,
        productId: productId
    }
})
exports.addWishlist = wish => Favorite.create(wish)