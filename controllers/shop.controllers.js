const productsModel = require("../models/products.model")
const shopModel = require("../models/shop.model")

async function createShopController(req,res){
    const {
        name,description,type,global,location,userid,shopImage
    } = req.body

    const newShop = new shopModel({
        shopname:name,
        shopdescription:description,
        type:type,
        global:global,
        location:location,
        userid: userid,
        shopimage:shopImage

    })

    await newShop.save()

    res.json({
        msg:'done'
    })


}

async function fetchUserShopsController(req,res){
    const {userid} = req.body;

    const shops = await shopModel.find({
        userid:userid
    })

    res.json({
        shops:shops
    })
}
async function getShopDetails(req,res){
    const {shopid} = req.body
    console.log(req.body)
    const shop = await shopModel.findById(shopid)
    await productsModel.find({
        shopid:shopid
    }).then(products=>{
        res.json({shop:shop,products:products})
    })
}


module.exports = {
    createShopController,
    fetchUserShopsController,
    getShopDetails
}