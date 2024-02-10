const mongoose = require('mongoose')
const Ingredient = require('./ingredient')
const db = require('../../config/db')

const startIngredients = [ 
    { name: "dough", description: "tasty pizza dough" },
    { name: "cheese", description: "fresh mozzarella cheese"},
    { name: "black olives", description: "juicy italian olives"},
    { name: "tomato sauce", description: "fresh tomatoe sauce"},
    { name: "pinneapple", description: "tasty pinneapple"},
    { name: "BBQ sauce", description: "texas flavor"},
    { name: "pepperoni", description: "tasty pepperoni"},
    { name: "sausage", description: "delicious italian sausage"},
    { name: "ham", description: "curated honey ham"},
    { name: "onions", description: "fresh onions"},
    { name: "greeen bell pepper", description: "fresh bell pepper"},
    { name: "basil leaves", description: "fresh basil"}

]

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        Ingredient.deleteMany({owner: null})
        .then(deletedIngredients => {
            console.log('deleted ingredient', deletedIngredients)

            Ingredient.create(startIngredients)
                .then(newIngredients => {
                    console.log('new ingredients added to the db')
                    mongoose.connection.close()
                })
                .catch(error => {
                    console.log('an error has occurred:\n', error)
                    mongoose.connection.close() 

        })
                
    })
                 .catch(error => {
                    console.log('an error has occurred: \n', error)

        // VERY IMPORTANT
                 mongoose.connection.close() 
                })
            })
            .catch(error => {
            console.log('an error has occurred: \n', error)

            
            mongoose.connection.close() 
            })