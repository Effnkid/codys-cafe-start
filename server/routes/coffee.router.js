const router = require('express').Router();
const { Coffee } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router
	.get('/', async (req, res, next) => {
		try {
			const coffee = await Coffee.findAll();
			res.send(coffee);
		} catch (e) {
			next(e);
		}
	})
	.post('/', async (req, res, next) => {
		try {
			const coffee = await Coffee.create(req.body);

			res.status(201).send(coffee);
		} catch (e) {
			next(e);
		}
	});

router.get('/ingredients/:ingredientName', async (req, res, next) => {
	try {
		const ingredientName = req.params['ingredientName'];
		const coffee = await Coffee.findByIngredient(ingredientName);
		if (!coffee) {
			const error = new Error('There is no ingredientName');
			error.status = 404;
			throw error;
		} else {
			res.send(coffee);
		}
	} catch (e) {
		next(e);
	}
});

router.get('/:coffeeId', async (req, res, next) => {
	try {
		const coffee = await Coffee.findByPk(req.params[`coffeeId`]);
		if (!coffee) {
			const error = new Error('There is no CoffeeId');
			error.status = 404;
			throw error;
		} else {
			res.send(coffee);
		}
	} catch (e) {
		next(e);
	}
});
module.exports = router;
