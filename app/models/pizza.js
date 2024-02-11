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
	

// we define virtuals outside of the schema

// virtuals allow us to derive additional data from already existing data on our documents
// when a document is retrieved, and turned into an object or JSON, the virtuals are added and sent along with the response.

// first virtual, 'full title' - this produces a string, that is derived from the name and type fields
pizzaSchema.virtual('fullTitle').get(function () {
    return `${this.name}`
})



const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;