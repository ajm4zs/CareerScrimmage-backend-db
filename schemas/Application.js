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

module.exports = ApplicationSchema;