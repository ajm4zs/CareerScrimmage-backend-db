const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OpportunitySchema = require('./Opportunity');
const errors = require('careerscrimmage-backend-utils').errors;
const async = require('async');

const industries = [
	'Education',
	'Finance',
	'Government',
	'Healthcare',
	'Manufacturing',
	'Marketing',
	'Media',
	'Real Estate',
	'Retail',
	'Technology'
];

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
		type: String,
		enum: industries
	},
	opportunities: [OpportunitySchema]
}, { timestamps: true });

EmployerSchema.statics.getOpportunityById = function (id, opportunityId, callback) {

	this.findById(id, function (error, employer) {
		if (error) return void callback(error);
		if (!employer) return void callback(new errors.NotFoundError('Employer not found.'));

		const o = employer.opportunities.id(opportunityId);
		if (!o) return void callback(new errors.NotFoundError('Opportunity is not found.'));

		callback(null, o);
	});
};

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

EmployerSchema.statics.findOpenOpportunities = function (callback) {
	this.find({}, {
		opportunities: true,
		profilePictureUrl: true,
		name: true,
		_id: true
	}, function (error, opportunities) {
		if (error) return void callback(error);
		if (!opportunities) return void callback(null, false);

		callback(null, true, opportunities);
	});
};

EmployerSchema.statics.findAllOpenOpportunities = function (callback) {
	this.find({}, {
		opportunities: true,
		profilePictureUrl: true,
		name: true,
		_id: true
	}, function (error, employers) {
		if (error) return void callback(error);
		if (!employers) return void callback(null, false);

		const openOpportunities = [];

		// now we want to filter opportunities
		async.each(employers, function (employer, cb) {

			async.each(employer.opportunities, function (opportunity, cb1) {
				if (opportunity.isActive && !opportunity.isPastDeadline) {
					const opportunityWithEmployerFields = {};
					opportunityWithEmployerFields._id = opportunity._id;
					opportunityWithEmployerFields.name = opportunity.name;
					opportunityWithEmployerFields.city = opportunity.city;
					opportunityWithEmployerFields.state = opportunity.state;
					opportunityWithEmployerFields.description = opportunity.description;
					opportunityWithEmployerFields.startDate = opportunity.startDate;
					opportunityWithEmployerFields.endDate = opportunity.endDate;
					opportunityWithEmployerFields.deadlineDate = opportunity.deadlineDate;
					opportunityWithEmployerFields.employerName = employer.name;
					opportunityWithEmployerFields.employerId = employer._id;
					opportunityWithEmployerFields.employerProfileUrl = employer.profilePictureUrl;
					opportunityWithEmployerFields.isActive = opportunity.isActive;
					opportunityWithEmployerFields.opportunityType = opportunity.getType;
					openOpportunities.push(opportunityWithEmployerFields);
				}
				cb1();
			}, function (err2) {
				cb(err2);
			});

		}, function (err1) {
			return void callback(err1, true, openOpportunities);
		});

	});
};

EmployerSchema.statics.findAllClosedOpportunities = function (callback) {
	this.find({}, {
		opportunities: true,
		profilePictureUrl: true,
		name: true,
		_id: true
	}, function (error, employers) {
		if (error) return void callback(error);
		if (!employers) return void callback(null, false);

		const closedOpportunities = [];

		// now we want to filter opportunities
		async.each(employers, function (employer, cb) {

			async.each(employer.opportunities, function (opportunity, cb1) {
				if (!opportunity.isActive || opportunity.isPastDeadline || opportunity.isPastStart) {
					const opportunityWithEmployerFields = {};
					opportunityWithEmployerFields._id = opportunity._id;
					opportunityWithEmployerFields.name = opportunity.name;
					opportunityWithEmployerFields.city = opportunity.city;
					opportunityWithEmployerFields.state = opportunity.state;
					opportunityWithEmployerFields.description = opportunity.description;
					opportunityWithEmployerFields.startDate = opportunity.startDate;
					opportunityWithEmployerFields.endDate = opportunity.endDate;
					opportunityWithEmployerFields.deadlineDate = opportunity.deadlineDate;
					opportunityWithEmployerFields.employerName = employer.name;
					opportunityWithEmployerFields.employerId = employer._id;
					opportunityWithEmployerFields.employerProfileUrl = employer.profilePictureUrl;
					opportunityWithEmployerFields.isActive = opportunity.isActive;
					opportunityWithEmployerFields.opportunityType = opportunity.getType;
					closedOpportunities.push(opportunityWithEmployerFields);
				}
				cb1();
			}, function (err2) {
				cb(err2);
			});

		}, function (err1) {
			return void callback(err1, true, closedOpportunities);
		});

	});
};

module.exports = EmployerSchema;