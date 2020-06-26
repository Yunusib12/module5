const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String
    },
    dateOrder: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', Order);

