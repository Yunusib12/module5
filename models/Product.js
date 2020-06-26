const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;


const Product = new Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', Product);