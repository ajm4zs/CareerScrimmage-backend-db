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
	},
	isCurrent: {
		type: Boolean
	}
}, { timestamps: true });

EducationSchema.methods.update = function (updated) {
	this.school = updated.school;
	this.description = updated.description;
	this.startDate = updated.startDate;
	this.endDate = updated.endDate;
	this.isCurrent = updated.isCurrent;
};

module.exports = EducationSchema;