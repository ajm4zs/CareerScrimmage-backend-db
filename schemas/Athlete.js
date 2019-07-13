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

AthleteSchema.statics.addTestScoresById = function (id, testScore, callback) {

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