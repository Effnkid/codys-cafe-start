const Sequelize = require('sequelize');
const db = require('./database');
const Op = Sequelize.Op;

const Coffee = db.define('coffee', {
	// your code here
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ingredients: {
		type: Sequelize.JSONB,
	},
});
//instance method
Coffee.prototype.getIngredients = function () {
	return this.ingredients.join(', ');
};
//class method
Coffee.findByIngredient = function (ingredientName) {
	return Coffee.findAll({
		where: {
			ingredients: {
				[Op.contains]: [ingredientName],
			},
		},
	});
};

Coffee.beforeValidate((coffee) => {
	if (!coffee.ingredients) {
		coffee.ingredients = ['love'];
	} else if (!coffee.ingredients.includes('love')) {
		coffee.ingredients.push('love');
	}
});

module.exports = Coffee;
