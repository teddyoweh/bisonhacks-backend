
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
     
    },
    firstname:{},
    lastname:{},
    userid:{},

    password: {
        type: String,
      
    },
    uimg: {
        type: String,
        default:"https://res.cloudinary.com/ddaxprhmz/image/upload/v1710478215/default-avatar-icon-of-social-media-user-vector_qgfdm2.jpg",
    },
    date: {
        type: Date,
        default: Date.now
    }



})

module.exports = User = mongoose.model('Users', userSchema);
