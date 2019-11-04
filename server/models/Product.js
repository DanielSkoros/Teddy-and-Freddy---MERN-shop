const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true,
    },
    description: {
        required: true,
        type: String,
        maxLength: 10000,
    },
    price: {
        required: true,
        type: Number,
        maxLength: 255,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    shipping: {
        required: true,
        type: Boolean,
    },
    available: {
        required: true,
        type: Boolean,
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
    type: {
        type: String,
        ref: 'Type',
        required: true,
    },
    sold: {
        type: Number,
        maxLength: 255,
        default: 0,
    },
    publish: {
        required: true,
        type: Boolean,
    },
    images: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };