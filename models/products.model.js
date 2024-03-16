
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{},
    price:{},
    action:{},
    rate:{},
    imgs:{
        type:Array
    },
    ownerid:{},
    date: {
        type: Date,
        default: Date.now
    },
    shopid:{}



})

module.exports = Products = mongoose.model('Products', productSchema);
