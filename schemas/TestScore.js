const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');

const TestScoreSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	type: {
		type: String,
		trim: true
	},
	score: {
		type: Number,
		min: 0,
		max: 800
	}
}, { timestamps: true });

TestScoreSchema.methods.update = function (updated) {
	this.name = updated.name;
	this.type = updated.type;
	this.score = updated.score;
};

module.exports = TestScoreSchema;