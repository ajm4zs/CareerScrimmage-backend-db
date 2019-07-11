const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	}
}, { timestamps: true });

module.exports = AthleteSchema;