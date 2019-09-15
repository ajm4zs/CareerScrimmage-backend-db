const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');
const errors = require('careerscrimmage-backend-utils').errors;
const moment = require('moment');

const OpportunitySchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	city: {
		type: String,
		trim: true,
		required: true
	},
	state: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	startDate: {
		type: Date,
		required: true,
		index: true
	},
	endDate: {
		type: Date,
		required: true
	},
	deadlineDate: {
		type: Date,
		required: true,
		index: true
	}
	// ,
	// status: {
	// 	type: String,
	// 	default: 'pending',
	// 	enum: ['past', 'reviewable', 'open']
	// }
}, { timestamps: true });

OpportunitySchema.virtual('status').get(function () {
	const currentDate = moment().utc().format('YYYY-MM-DD');

	if (moment(this.startDate).utc().isSameOrAfter(currentDate)) return 'past';
	else if (moment(this.deadlineDate).utc().isSameOrAfter(currentDate)) return 'reviewable';
	else return 'open';
});

OpportunitySchema.statics.findByState = function (state, callback) {
	this.where('state', utilities.toCanonical(state)).findOne(callback);
};

OpportunitySchema.methods.update = function (updated) {
	this.name = updated.name;
	this.city = updated.city;
	this.state = updated.state;
	this.description = updated.description;
	this.startDate = updated.startDate;
	this.endDate = updated.endDate;
	this.deadlineDate = updated.deadlineDate;
};

module.exports = OpportunitySchema;