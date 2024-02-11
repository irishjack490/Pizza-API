//set up initial pizzas in the database
//command npm run seed
const mongoose = require('mongoose')
const Pizza = require('./pizza')
const db = require('../../config/db')

async function seedPizzas() {
    try {
    
    const startPizzas = [
        {
            name: 'Margherita',
            baseIngredients: 'Dough, Mozarella, Tomatoe Sauce, Basil',
            available: 'true'
            
        },
        {
            name: 'Detroit',
            baseIngredients: 'Dough, Mozarella, Pepperoni',
            available: 'true',
            
        },
        {
            name: 'St. Louis',
            baseIngredients: 'Thin-crust, Provel Cheese',
            available: 'true'
        
        },
        {
            name: 'New York Style',
            baseIngredients: 'Thin-crust, lots of cheese',
            available: 'true'
            
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