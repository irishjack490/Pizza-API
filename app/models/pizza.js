const mongoose = require('mongoose')
const sideSchema = require('./side')

const pizzaSchema = new mongoose.Schema(
	{
		name: {
		    type: String,
			description: String,
			required: true,
		},
		baseIngredients: {
			type: String,
			required: true,
		},
		
        available: {
            type: Boolean,
            required: true,
			default: true
        },
		sides: [sideSchema],
		
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
			
		},
	},
		{
			timestamps: true,
			toObject: { virtuals: true },
			toJSON: { virtuals: true },
		}

	);
	
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;