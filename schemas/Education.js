const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');

const EducationSchema = new Schema({
	school: {
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
	}
}, { timestamps: true });

module.exports = EducationSchema;