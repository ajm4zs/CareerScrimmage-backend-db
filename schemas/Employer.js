const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	opportunities: [{ type: Schema.ObjectId, ref: 'Opportunity' }]
}, { timestamps: true });

module.exports = EmployerSchema;