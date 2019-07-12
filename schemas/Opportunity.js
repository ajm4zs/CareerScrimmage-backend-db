const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const utilities = require('./../lib/utilities');

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
}, { timestamps: true });

OpportunitySchema.statics.findByState = function (state, callback) {
	this.where('state', utilities.toCanonical(state)).findOne(callback);
};

module.exports = OpportunitySchema;