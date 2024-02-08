const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema(
	{
		name: {
		    type: String,
			required: true,
		},
		ingredients: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: true,
		
		}],
        vegetarian: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            enum: ['Small', 'Medium', 'Large'],
            default: 'Medium',
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}

	});
	
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;