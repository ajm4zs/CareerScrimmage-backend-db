const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OpportunitySchema = require('./Opportunity');
const errors = require('careerscrimmage-backend-utils').errors;

const EmployerSchema = new Schema({
	type: {
		type: String,
		default: 'employer',
		enum: ['employer']
	},
	description: {
		type: String
	},
	industry: {
		type: String
	},
	opportunities: [OpportunitySchema]
}, { timestamps: true });

EmployerSchema.statics.addOpportunityById = function (id, opportunity, callback) {

	this.findByIdAndUpdate(
		id,
		{ $addToSet: { opportunities: opportunity } },
		{ safe: true, new: true },
		function (error, employer) {
			if (error) return void callback(error);
			if (!employer) return void callback(new errors.NotFoundError('Employer not found'));
			callback(null, employer.opportunities);
		}
	);
};

EmployerSchema.statics.updateOpportunityById = function (id, opportunity, callback) {

	this.findById(id, function (error, employer) {
		if (error) return void callback(error);
		if (!employer) return void callback(new errors.NotFoundError('Employer not found.'));

		const o = employer.opportunities.id(opportunity._id);
		if (!o) return void callback(new errors.NotFoundError('Opportunity is not found.'));
		o.update(opportunity);

		employer.save(function (error, employer) {
			if (error) return void callback(error);
			if (!employer) return void callback(new errors.NotFoundError('Employer not found.'));
			callback(null, employer.opportunities);
		});
	});
};

EmployerSchema.statics.deleteOpportunityById = function (id, opportunityId, callback) {
	this.findById(id, function (error, employer) {
		if (error) return void callback(error);
		if (!employer) return void callback(new errors.NotFoundError('Employer not found.'));

		const o = employer.opportunities.id(opportunityId);
		if (!o) return void callback(null, employer.opportunities);
		o.remove();

		employer.save(function (error, employer) {
			if (error) return void callback(error);
			if (!employer) return void callback(new errors.NotFoundError('Employer not found.'));
			callback(null, employer.opportunities);
		});
	});
};

module.exports = EmployerSchema;