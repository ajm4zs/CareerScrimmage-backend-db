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

// OpportunitySchema.statics.validateCredentials = function (email, password, callback) {
// 	this.findByEmail(email, function (error, user) {
// 		if (error) return void callback(error);
// 		if (!user) return void callback(null, false);

// 		user.validatePassword(password, function (error, isValid) {
// 			if (error) return void callback(error);
// 			if (!isValid) return void callback(null, false);
// 			callback(null, true, user);
// 		});
// 	});
// };

OpportunitySchema.methods.validatePassword = function (password, callback) {
	bcrypt.compare(password, this.hashword, callback);
};

module.exports = OpportunitySchema;