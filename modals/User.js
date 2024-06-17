const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Firstname is required"]
    }, 
    email: {
        type: String,
        required: [true, "email is required"]
    }, 
    password: {
        type: String,
        required: [true, "password is required"]
    }, 
    mobNo: {
        type: String,
        required: [true, "mobile number is required"]
    }
})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel