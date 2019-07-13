const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');

const ExperienceSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	isCurrent: {
		type: Boolean
	}
}, { timestamps: true });

module.exports = ExperienceSchema;