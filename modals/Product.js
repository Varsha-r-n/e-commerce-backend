const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"]
    }, 
    productPrice: {
        type: String,
        required: [true, "Product price is required"]
    }, 
    productQuantity: {
        type: String,
        required: [true, "Product Quantity is required"]
    }, 
    productCategory: {
        type: String,
        required: [true, "Product Category is required"]
    },
    productMainImage: {
        type: String,
        required: [true, "Product main image is required"]
    }
})

const ProductModel = mongoose.model("product", ProductSchema)
module.exports = ProductModel