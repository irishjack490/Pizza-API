//set up initial pizzas in the database
//command npm run seed
const mongoose = require('mongoose')
const Pizza = require('./pizza')
const Ingredient = require('./ingredient');
const db = require('../../config/db')

async function seedPizzas() {
    try {
        // Fetch ObjectIds of ingredients from the database
    const ingredients = await Ingredient.find({}, '_id');
    const startPizzas = [
        {
            name: 'Margherita',
            ingredients: ingredients,
            customizable: true,
            size: 'Medium'
        },
        {
            name: 'Detroit',
            ingredients: ingredients,
            customizable: true,
            size: 'Medium'
        },
        {
            name: 'St. Louis',
            ingredients: ingredients,
            customizable: true,
            size: 'Medium'
        },
        {
            name: 'New York Style',
            ingredients: ingredients,
            customizable: true,
            size: 'Medium'
        }
    ];
    await Pizza.insertMany(startPizzas);

    console.log('Pizzas seeded successfully!');
} catch (error) {
    console.error('Error seeding pizzas:', error);
}
}


mongoose.connect(db, {
    useNewUrlParser: true, // Removed the semicolon here
    useUnifiedTopology: true // Added this option for avoiding deprecation warning
});

// Once connected, call the seedPizzas function to start seeding
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB database');
    await seedPizzas();
});

// Handle connection errors
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});