const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const moment = require('moment');

const AuthTokenSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	token: {
		type: String,
		required: true
	},
	expiresAt: {
		type: Date,
		required: true
	},
	type: {
		type: String,
		enum: ['reset-password'],
		required: true
	}
}, { timestamps: true });

AuthTokenSchema.index({ token: 1 }, { unique: true });
AuthTokenSchema.index({ token: 1, type: 1 });
AuthTokenSchema.index({ user: 1, type: 1 });

AuthTokenSchema.statics.create = function (user, tokenLife, type, callback) {
	const AuthToken = this;

	crypto.randomBytes(48, function (error, buffer) {
		if (error) return void callback(error);

		const authToken = new AuthToken();
		authToken.token = buffer.toString('hex');
		authToken.user = user;
		authToken.expiresAt = moment().add(tokenLife, 'hours').toDate();
		authToken.type = type;
		authToken.save(function (error, authToken) {
			callback(error, authToken);
		});
	});
};

AuthTokenSchema.statics.findByTokenAndType = function (token, type, callback) {
	this.where('token', token).where('type', type).populate('user').findOne(callback);
};

AuthTokenSchema.statics.removeByUserAndType = function (user, type, callback) {
	this.where('user', user).where('type', type).remove(callback);
};

AuthTokenSchema.methods.isExpired = function () {
	return this.expiresAt < new Date();
};

module.exports = AuthTokenSchema;
