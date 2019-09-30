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
		type: Date
	},
	deadlineDate: {
		type: Date,
		required: true,
		index: true
	},
	isActive: {
		type: Boolean
	},
	opportunityType: {
		type: String,
		required: true,
		enum: ['careerDay', 'internship', 'shadow']
	}
	// ,
	// status: {
	// 	type: String,
	// 	default: 'pending',
	// 	enum: ['past', 'reviewable', 'open']
	// }
}, { timestamps: true }, { toObject: { virtuals: true } }, { toJSON: { virtuals: true } });

OpportunitySchema.virtual('isPastDeadline').get(function () {
	const currentDate = moment().utc().format('YYYY-MM-DD');

	if (moment(this.deadlineDate).utc().isSameOrBefore(currentDate)) return true;
	else return false;
});

OpportunitySchema.virtual('isPastStart').get(function () {
	const currentDate = moment().utc().format('YYYY-MM-DD');

	if (moment(this.startDate).utc().isSameOrBefore(currentDate)) return true;
	else return false;
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
	if (updated.endDate && updated.endDate !== '') this.endDate = updated.endDate;
	this.deadlineDate = updated.deadlineDate;
	this.opportunityType = updated.opportunityType;
};

module.exports = OpportunitySchema;