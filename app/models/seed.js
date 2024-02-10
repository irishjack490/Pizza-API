const mongoose = require('mongoose');
const db = require('../../config/db');
const Ingredient = require('./ingredient');
const Pizza = require('./pizza');


const args = process.argv.slice(2);

// Check if a seeding script is specified
if (args.length === 0) {
    console.log('Usage: npm run seed <seeding_script>');
    process.exit(1);
}

// Determine which seeding script to run based on the provided argument
const seedingScript = args[0];

// Run the specified seeding script
try {
    switch (seedingScript) {
        case 'ingredients':
            require('./seedIngredients');
            break;
        case 'pizzas':
            require('./seedPizzas');
            break;
        default:
            console.log(`Unknown seeding script: ${seedingScript}`);
            process.exit(1);
    }
} catch (error) {
    console.error('Error running seeding script:', error);
    process.exit(1);
}

// Connect to MongoDB database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));