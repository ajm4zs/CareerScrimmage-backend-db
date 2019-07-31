const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const async = require('async');
const bcrypt = require('bcrypt');

const errors = require('careerscrimmage-backend-utils').errors;
const utilities = require('./../lib/utilities');

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String
	},
	hashword: {
		type: String,
		required: true
	},
	profilePictureUrl: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	instagram: {
		type: String
	},
	twitter: {
		type: String
	}
}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('validate', function (next) {
	const self = this;

	async.parallel([
		function (cb) {
			if (self.isModified('password')) {
				bcrypt.genSalt(function (error, salt) {
					if (error) return void cb(error);

					bcrypt.hash(self.password, salt, function (error, hash) {
						if (error) return void cb(error);

						self.hashword = hash;
						cb();
					});
				});
			}
			else {
				cb();
			}
		},
		function (cb) {
			self.email = utilities.toCanonical(self.email);
			cb();
		}
	], next);
});

UserSchema.pre('save', function (next) {
	this.password = null;
	next();
});

UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.password;
		delete ret.hashword;
		delete ret.pushNotifications;
		return ret;
	}
});

UserSchema.virtual('isAthlete').get(function () {
	return this.type === 'athlete';
});

UserSchema.virtual('isEmployer').get(function () {
	return this.type === 'employer';
});

UserSchema.statics.findByEmail = function (email, callback) {
	this.where('email', utilities.toCanonical(email)).findOne(callback);
};

UserSchema.statics.validateCredentials = function (email, password, callback) {
	this.findByEmail(email, function (error, user) {
		if (error) return void callback(error);
		if (!user) return void callback(null, false);

		user.validatePassword(password, function (error, isValid) {
			if (error) return void callback(error);
			if (!isValid) return void callback(null, false);
			callback(null, true, user);
		});
	});
};

UserSchema.methods.validatePassword = function (password, callback) {
	bcrypt.compare(password, this.hashword, callback);
};

// statics to get/remove recordings by id
// get user
// get all users
// insert new user
// update profile image
// update user info

UserSchema.statics.updateProfileImageById = function (id, imageUrl, callback) {

	this.findById(id, function (error, user) {
		if (error) return void callback(error);
		if (!user) return void callback(new errors.NotFoundError('User not found.'));

		user.profilePictureUrl = imageUrl;

		user.save(function (error, user) {
			if (error) return void callback(error);
			if (!user) return void callback(new errors.NotFoundError('User not found.'));
			callback(null, user.profilePictureUrl);
		});
	});
};

module.exports = UserSchema;