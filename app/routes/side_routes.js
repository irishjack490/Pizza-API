// import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pizzas
const Pizza = require('../models/pizza')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

///////////////////////////////////////////////////////
// routes go here 
///////////////////////////////////////////////////////

// CREATE
// POST /sides/oiu32458098sdf903rjknew
router.post('/sides/:pizzaId', removeBlanks, (req, res, next) => {
	// save the side from the request body
    const side = req.body.side
    // save the pizzaId for easy ref
    const pizzaId = req.params.pizzaId

	Pizza.findById(pizzaId)
		// make sure we have a pizza
        .then(handle404)
		.then((pizza) => {
            pizza.sides.push(side)

			return pizza.save()
		})
        .then(pizza => res.status(201).json({ pizza: pizza }))
		.catch(next)
})

// UPDATE
// PATCH /pizzas/5a7db6c74d55bc51bdf39793/546sf456dfs645dfs4894sdf4
router.patch('/sides/:pizzaId/:sideId', requireToken, removeBlanks, (req, res, next) => {
	// let's grab both ids from req.params
    const { pizzaId, sideId } = req.params

	Pizza.findById(pizzaId)
		.then(handle404)
		.then((pizza) => {
			// single out the side
            const theSide = pizza.sides.id(sideId)
            if (!theSide) {
                throw new Error('Side not found');
            }
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, pizza)

            // update the existing side
            theSide.set(req.body.side)

			// pass the result of Mongoose's `.update` to the next `.then`
			return pizza.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /sides/5a7db6c74d55bc51bdf39793/546sf456dfs645dfs4894sdf4
router.delete('/sides/:pizzaId/:sideId', requireToken, removeBlanks, (req, res, next) => {
	// let's grab both ids from req.params
    const { pizzaId, sideId } = req.params

	Pizza.findById(pizzaId)
		.then(handle404)
		.then((pizza) => {
			// single out the side
            const theSide = pizza.sides.find(side => side.id === sideId);
            if (!theSide) {
                throw new Error('Side not found');
            }
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, pizza)

            pizza.sides.pull(sideId);


			// pass the result of Mongoose's `.update` to the next `.then`
			return pizza.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router