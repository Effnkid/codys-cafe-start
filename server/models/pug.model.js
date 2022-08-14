const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define('pugs', {
	// your code here
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	age: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	biography: {
		type: Sequelize.TEXT,
	},
});

Pug.prototype.isPuppy = function () {
	return this.age <= 1;
};
Pug.prototype.shortBio = function () {
	return this.biography.split(/\.|!|\?/m)[0];
};
Pug.findByCoffee = async function (coffee) {
	return await Pug.findAll({
		include: [
			{
				model: Coffee,
				as: `favoriteCoffee`,
				where: { name: coffee },
			},
		],
	});
};

Pug.beforeValidate((saveIt) => {
	saveIt.name = saveIt.name[0].toUpperCase() + saveIt.name.slice(1);
});

module.exports = Pug;
