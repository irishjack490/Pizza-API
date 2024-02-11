const mongoose = require('mongoose');

// side is going to be a subdocument NOT a model
// sides will exist as a part of a pizza's sides array
// each side will belong to one pizza, that's it
// one to many (pizza -|--< sides)

const sideSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        
    },

    description: {
        type: String
    },
    size : {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'

    }
}, { timestamps: true })



module.exports = sideSchema;