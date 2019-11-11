const mongoose = require('mongoose');

require('dotenv').config();

const todoSchema = mongoose.Schema({
    todo: {
        required: true,
        type: String,
        maxLength: 1024,
    },
    completed: {
        required: false,
        type: Boolean,
        default: false,
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo }