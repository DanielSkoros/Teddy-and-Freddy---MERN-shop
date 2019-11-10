const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    products: {
        type: Array,
        default: [],
    },
    total: {
        required: true,
        type: Number,
    },
    userId: {
        type: String,
        required: false,
        default: 'guest'
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
    country: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    city: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    street: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    unit: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 128,
    },
    state: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    zip: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 128,
    },
    phone: {
        type: String,
        required: false,
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