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
	education: [EducationSchema],
	favoriteEmployers: [{ type: Schema.ObjectId, ref: 'Employer' }]
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

AthleteSchema.statics.updateExperienceById = function (id, experience, callback) {

	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const e = athlete.experiences.id(experience._id);
		if (!e) return void callback(new errors.NotFoundError('Experience is not found.'));
		e.update(experience);

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.experiences);
		});
	});
};

AthleteSchema.statics.deleteExperienceById = function (id, experienceId, callback) {
	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const e = athlete.experiences.id(experienceId);
		if (!e) return void callback(null, athlete.experiences);
		e.remove();

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.experiences);
		});
	});
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

AthleteSchema.statics.updateEducationById = function (id, education, callback) {

	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const e = athlete.education.id(education._id);
		if (!e) return void callback(new errors.NotFoundError('Education is not found.'));
		e.update(education);

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.education);
		});
	});
};

AthleteSchema.statics.deleteEducationById = function (id, educationId, callback) {
	this.findById(id, function (error, athlete) {
		if (error) return void callback(error);
		if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));

		const e = athlete.education.id(educationId);
		if (!e) return void callback(null, athlete.educatio);
		e.remove();

		athlete.save(function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			callback(null, athlete.education);
		});
	});
};

AthleteSchema.statics.addEmployerById = function (athleteId, employerId, callback) {
	this.findByIdAndUpdate(
		athleteId,
		{ $addToSet: { favoriteEmployers: employerId } },
		{ safe: true, new: true },
		function (error, athlete) {
			if (error) return void callback(error);
			if (!athlete) return void callback(new errors.NotFoundError('Athlete not found.'));
			if (!employerId) return void callback(new errors.NotFoundError('Employer not found.'));

			callback(null, athlete);
		}
	);
};

AthleteSchema.statics.removeEmployerById = function (athleteId, employerId, callback) {
	const Athlete = this;
	const Employer = this.model('Employer');

	Employer.findById(employerId, function (error, employer) {
		Athlete.findByIdAndUpdate(
			athleteId,
			{ $pull: { favoriteEmployers: employerId } },
			{ safe: true, new: true },
			function (error, athlete) {
				if (error) return void callback(error);
				callback(null, athlete);
			}
		);
	});
};

module.exports = AthleteSchema;