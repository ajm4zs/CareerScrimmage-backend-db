const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const errors = require('careerscrimmage-backend-utils').errors;
const EducationSchema = require('./Education');
const ExperienceSchema = require('./Experience');
const TestScoreSchema = require('./TestScore');

const AthleteSchema = new Schema({
	type: {
		type: String,
		default: 'athlete',
		enum: ['athlete']
	},
	description: {
		type: String
	},
	school: {
		type: String
	},
	graduationYear: {
		type: Number,
		min: 2020
	},
	organization: {
		type: String
	},
	resumeUrl: {
		type: String
	},
	sat: {
		reading: {
			type: Number,
			min: 200,
			max: 800
		},
		math: {
			type: Number,
			min: 200,
			max: 800
		},
		writing: {
			type: Number,
			min: 200,
			max: 800
		}
	},
	act: {
		reading: {
			type: Number,
			min: 1,
			max: 36
		},
		math: {
			type: Number,
			min: 1,
			max: 36
		},
		english: {
			type: Number,
			min: 1,
			max: 36
		},
		science: {
			type: Number,
			min: 1,
			max: 36
		}
	},
	testScores: [TestScoreSchema],
	experiences: [ExperienceSchema],
	education: [EducationSchema]
}, { timestamps: true });

AthleteSchema.statics.addTestScoreById = function (id, testScore, callback) {

	this.findByIdAndUpdate(
		id,
		{ $addToSet: { testScores: testScore } },
		{ safe: true, new: true },
		function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found'));
			callback(null, athlete.testScores);
		}
	);
};

AthleteSchema.statics.updateTestScoreById = function (id, testScore, callback) {

	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const t = athlete.testScores.id(testScore._id);
		if (!t) return void callback(new errors.NotFoundError('Test Score is not found.'));
		t.update(testScore);

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.testScores);
		});
	});
};

AthleteSchema.statics.deleteTestScoreById = function (id, testScoreId, callback) {
	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const t = athlete.testScores.id(testScoreId);
		if (!t) return void callback(null, athlete.testScores);
		t.remove();

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.testScores);
		});
	});
};

AthleteSchema.statics.addExperienceById = function (id, experience, callback) {

	this.findByIdAndUpdate(
		id,
		{ $addToSet: { experiences: experience } },
		{ safe: true, new: true },
		function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found'));
			callback(null, athlete.experiences);
		}
	);
};

AthleteSchema.statics.addEducationById = function (id, education, callback) {

	this.findByIdAndUpdate(
		id,
		{ $addToSet: { education: education } },
		{ safe: true, new: true },
		function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found'));
			callback(null, athlete.education);
		}
	);
};

module.exports = AthleteSchema;