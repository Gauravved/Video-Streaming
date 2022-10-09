const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    channelName:{
        type: String,
        min: 3,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password:{
        type: String,
        require: true,
        min: 8
    },
    isProfileSet: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String,
        default: ""
    }
});
module.exports.userSchema = mongoose.model("Users", userSchema);