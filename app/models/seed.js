const mongoose = require('mongoose');
const db = require('../../config/db');
const Ingredient = require('./ingredient');
const Pizza = require('./pizza');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Check if the database is already seeded with ingredients and pizzas
        return Promise.all([
            Ingredient.countDocuments(),
            Pizza.countDocuments()
        ]);
    })
    .then(([ingredientCount, pizzaCount]) => {
        // If both ingredient and pizza counts are greater than 0, the database is already seeded
        if (ingredientCount > 0 && pizzaCount > 0) {
            console.log('Database already seeded with ingredients and pizzas.');
            // Server will continue running
        } else {
            console.log('Database not seeded. Running seeding scripts...');
            // Run the seeding scripts
            require('./seedIngredients');
            require('./seedPizzas');
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        // Server will continue running even if there's an error connecting to the database
    });