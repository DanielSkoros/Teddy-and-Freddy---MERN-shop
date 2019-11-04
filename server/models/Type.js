const mongoose = require('mongoose');

require('dotenv').config();

const typeSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true,
        maxLength: 64,
    },
});

const Type = mongoose.model('Type', typeSchema);

module.exports = { Type }