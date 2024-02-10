const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema(
	{
		name: {
		    type: String,
			description: String,
			required: true,
		},
		ingredients: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: true,
		
		}],
        customizable: {
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
			ref: 'User'
			
		}

	});
	
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;