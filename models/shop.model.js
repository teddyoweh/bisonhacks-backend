
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    shopname:{},
    address:{
        
    },
    type:{},
    shopimage:{},
    shopdescription:{},
userid:{},
    location:{},
    global:{},
    uimg: {
        type: String,
        default:"https://res.cloudinary.com/ddaxprhmz/image/upload/v1710478215/default-avatar-icon-of-social-media-user-vector_qgfdm2.jpg",
    },
    date: {
        type: Date,
        default: Date.now
    }



})

module.exports = Shop = mongoose.model('Shops', shopSchema);
