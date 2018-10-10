const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    googleid:{
        type: Number,
        required: true
    },
    imageurl:{
        type: String,
    }
})

module.exports = User = mongoose.model("user", UserSchema) 