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
	}
}, { timestamps: true });

module.exports = AthleteSchema;