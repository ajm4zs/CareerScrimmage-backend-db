const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplicationSchema = require('./Application');

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');
const errors = require('careerscrimmage-backend-utils').errors;

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
	},
	applications: [ApplicationSchema]
}, { timestamps: true });

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

OpportunitySchema.statics.addApplicationById = function (id, application, callback) {

	this.findByIdAndUpdate(
		id,
		{ $addToSet: { applications: application } },
		{ safe: true, new: true },
		function (error, opportunity) {
			if (error) return void callback(error);
			if (!opportunity) return void callback(new errors.NotFoundError('Opportunity not found'));
			callback(null, opportunity.applications);
		}
	);
};

module.exports = OpportunitySchema;