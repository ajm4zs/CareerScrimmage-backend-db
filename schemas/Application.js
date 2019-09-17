const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilities = require('./../lib/utilities');

const ApplicationSchema = new Schema({
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'accepted', 'declined']
	},
	employer: {
		type: Schema.ObjectId,
		ref: 'Employer'
	},
	athlete: {
		type: Schema.ObjectId,
		ref: 'Athlete'
	},
	opportunity: {
		type: Schema.ObjectId,
		ref: 'Opportunity'
	}
}, { timestamps: true });

ApplicationSchema.statics.findApplicationsByAthlete = function (athleteId, callback) {
	this.find({ athlete: athleteId }, function (error, applications) {
		if (error) return void callback(error);
		if (!applications) return void callback(null, false);

		callback(null, true, applications);
	});
};

ApplicationSchema.statics.findApplicationsByEmployer = function (employerId, callback) {
	this.find({ employer: employerId }, function (error, applications) {
		if (error) return void callback(error);
		if (!applications) return void callback(null, false);

		callback(null, true, applications);
	});
};

ApplicationSchema.statics.findApplicationsByOpportunity = function (opportunityId, callback) {
	this.find({ opportunity: opportunityId }, function (error, applications) {
		if (error) return void callback(error);
		if (!applications) return void callback(null, false);

		callback(null, true, applications);
	});
};

module.exports = ApplicationSchema;