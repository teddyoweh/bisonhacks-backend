const productsModel = require("../models/products.model")
const shopModel = require("../models/shop.model")

async function createProductsController(req,res){
    const {name,price,action, rate, imgs,shopid,ownerid} = req.body

    const newProduct = new productsModel({
        name:name,
        price:price,
        action:action,
        rate:rate,
        imgs:imgs,
        shopid:shopid,
        ownerid:ownerid
    })

    await newProduct.save()

    res.json({
        msg:"real"
    })
}



module.exports = {
    createProductsController,
 }