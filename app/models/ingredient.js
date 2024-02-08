const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Ingredient = mongoose.model('Ingredient')
module.exports = Ingredient;