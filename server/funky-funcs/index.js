const _ = require('lodash');

const intersection = (arr1, arr2) => {
	return _.intersection(arr1, arr2);
};

const flattenDeep = (arr) => {
	return _.flattenDeep(arr);
};

const flipArguments = (func) => {
	return _.flip(func);
};

const invert = (obj) => {
	return _.invert(obj);
};

const camelCase = (str) => {
	return _.camelCase(str);
};

module.exports = {
	intersection,
	flattenDeep,
	flipArguments,
	invert,
	camelCase,
};
