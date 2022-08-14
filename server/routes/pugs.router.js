const router = require('express').Router();
const { Pug } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router
	.get('/', async (req, res, next) => {
		try {
			const pugs = await Pug.findAll();
			res.send(pugs);
		} catch (e) {
			next(e);
		}
	})
	.post('/', async (req, res, next) => {
		try {
			const pug = await Pug.create(req.body);
			res.status(201).send(pug);
		} catch (e) {
			next(e);
		}
	});

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res, next) => {
	try {
		const pugs = await Pug.findByCoffee(req.params.favoriteCoffeeName);
		res.send(pugs);
	} catch (e) {
		next(e);
	}
});

router
	.get('/:pugId', async (req, res, next) => {
		try {
			const pug = await Pug.findByPk(req.params.pugId);
			if (!pug) {
				res.sendStatus(404);
			} else {
				res.send(pug);
			}
		} catch (e) {
			next(e);
		}
	})
	.put('/:pugId', async (req, res, next) => {
		try {
			const fav = req.body.favoriteCoffeeId;
			const pug = await Pug.findByPk(req.params.pugId);

			if (!pug) {
				res.sendStatus(404);
			} else {
				let set = await pug.setFavoriteCoffee(fav);
				res.send(set);
			}
		} catch (e) {
			next(e);
		}
	})
	.delete('/:pugId', async (req, res, next) => {
		try {
			const pug = await Pug.findByPk(req.params.pugId);
			if (!pug) {
				res.sendStatus(404);
			} else {
				await Pug.destroy({ where: { id: req.params.pugId } }).then(() => {
					res.status(204).end();
				});
			}
		} catch (e) {
			next(e);
		}
	});

module.exports = router;
