const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductCategorySchema = new Schema({
    productCategoryName: {
        type: String,
        required: [true, "Product category name is required"]
    },
    productCategoryOwner: {
        type: String,
        required: [true, "Product category owner is required"]
    }
})

const ProductCategoryModel = mongoose.model("productCategory", ProductCategorySchema)
module.exports = ProductCategoryModel