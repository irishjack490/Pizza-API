// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for pizza
const Pizza = require('../models/pizza')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /pizzas
router.get('/pizzas', (req, res, next) => {
	Pizza.find()
		.then((pizzas) => {
			// `pizzas` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return pizzas.map((pizza) => pizza.toObject())
		})
		// respond with status 200 and JSON of the pizzas
		.then((pizzas) => res.status(200).json({ pizzas: pizzas }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// show route for only the logged in user's pets
// GET /pizzas/mine
// requireToken gives us access to req.user.id
router.get('/pizzas/mine', requireToken, (req, res, next) => {
	Pizza.find({ owner: req.user.id })
		.then((pizzas) => {
			// `pizzas` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return pizzas.map((pizza) => pizza.toObject())
		})
		// respond with status 200 and JSON of the pets
		.then((pizzas) => res.status(200).json({ pizzas: pizzas }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// SHOW
// GET /pizzas/5a7db6c74d55bc51bdf39793
router.get('/pizzas/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Pizza.findById(req.params.id)
		.populate('owner')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "pizza" JSON
		.then((pizza) => res.status(200).json({ pizza: pizza.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /pizzas
router.post('/pizzas', requireToken, (req, res, next) => {
	// set owner of new pizza to be current user
	req.body.pizza.owner = req.user.id

	Pizza.create(req.body.pizza)
		// respond to succesful `create` with status 201 and JSON of new "pizza"
		.then((pizza) => {
			res.status(201).json({ pizza: pizza.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /pizzas/5a7db6c74d55bc51bdf39793
router.patch('/pizzas/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.pizza.owner

	Pizza.findById(req.params.id)
		.then(handle404)
		.then((pizza) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, pizza)

			// pass the result of Mongoose's `.update` to the next `.then`
			return pizza.updateOne(req.body.pizza)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /ex/5a7db6c74d55bc51bdf39793
router.delete('/pizzas/:id', requireToken, (req, res, next) => {
	Pizza.findById(req.params.id)
		.then(handle404)
		.then((pizza) => {
			// throw an error if current user doesn't own `pizza`
			requireOwnership(req, pizza)
			// delete the pizza ONLY IF the above didn't throw
			pizza.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
