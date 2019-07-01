const mongoose = require('mongoose');
const argv = require('yargs').argv;

const schemas = {
	AuthClient: require('./../schemas/AuthClient'),
	AuthToken: require('./../schemas/AuthToken'),
	Exercise: require('./../schemas/Exercise'),
	ExerciseType: require('./../schemas/ExerciseType'),
	Image: require('./../schemas/Image'),
	User: require('./../schemas/User'),
	ExerciseRecording: require('./../schemas/ExerciseRecording'),
	WeightRecording: require('./../schemas/WeightRecording')
};

class DB {

	constructor () {
		mongoose.Promise = global.Promise;

		this.models = {};
		this.connection = mongoose.createConnection();
		this.connected = false;

		// Models
		this.models.AuthClient = this.connection.model('AuthClient', schemas.AuthClient);
		this.models.AuthToken = this.connection.model('AuthToken', schemas.AuthToken);
		this.models.Exercise = this.connection.model('Exercise', schemas.Exercise);
		this.models.ExerciseType = this.connection.model('ExerciseType', schemas.ExerciseType);
		this.models.Image = this.connection.model('Image', schemas.Image);
		this.models.User = this.connection.model('User', schemas.User);
		this.models.ExerciseRecording = this.connection.model('ExerciseRecording', schemas.ExerciseRecording);
		this.models.WeightRecording = this.connection.model('WeightRecording', schemas.WeightRecording);
	}

	connect (connectionString, callback) {
		const self = this;

		this.connection.openUri(connectionString, {
			keepAlive: 300000,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true
		}, function (error) {
			if (error) return void callback(new Error(`Error connecting to MongoDB. ${error}`));
			self.connected = true;
			callback();
		});
	}

}

module.exports = DB;