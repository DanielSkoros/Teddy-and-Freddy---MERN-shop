const mongoose = require('mongoose');

require('dotenv').config();

const materialSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true,
        maxLength: 64,
    },
});

const Material = mongoose.model('Material', materialSchema);

module.exports = { Material }