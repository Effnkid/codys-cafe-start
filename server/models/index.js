const db = require('./database');
const Pug = require('./pug.model');
const Coffee = require('./coffee.model');

// VVV assign relations below VVV //
Pug.belongsTo(Coffee, { as: 'favoriteCoffee' });
Coffee.hasMany(Pug);

Pug.belongsToMany(Pug, { as: 'friends', through: 'otherPugs' });
// ^^^ assign relations above ^^^ //

module.exports = {
	db,
	Pug,
	Coffee,
};
// { foreignKey: 'id', as: 'favoriteCoffees' }
