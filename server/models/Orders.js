const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    products: {
        type: Array,
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    address: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    status: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
        default: 'ordered',
    },
}, {
    timestamps: true
});



const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };