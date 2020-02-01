const mongoose = require('mongoose');
const argv = require('yargs').argv;

const schemas = {
	User: require('./../schemas/User'),
	Opportunity: require('./../schemas/Opportunity'),
	Athlete: require('./../schemas/Athlete'),
	Employer: require('./../schemas/Employer'),
	Application: require('./../schemas/Application'),
	AuthToken: require('./../schemas/AuthToken')
};

class DB {

	constructor () {
		mongoose.Promise = global.Promise;

		this.models = {};
		this.connection = mongoose.createConnection();
		this.connected = false;

		// Models
		this.models.User = this.connection.model('User', schemas.User);
		this.models.Opportunity = this.connection.model('Opportunity', schemas.Opportunity);
		this.models.Application = this.connection.model('Application', schemas.Application);
		this.models.AuthToken = this.connection.model('AuthToken', schemas.AuthToken);

		// Discriminators
		this.models.Employer = this.models.User.discriminator('Employer', schemas.Employer);
		this.models.Athlete = this.models.User.discriminator('Athlete', schemas.Athlete);
	}

	connect (connectionString, callback) {
		const self = this;

		this.connection.openUri(connectionString, {
			keepAlive: 300000,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true
		}, function (error) {
			if (error) return void callback(new Error(`Error connecting to MongoDB. ${error}`));
			self.connected = true;
			callback();
		});
	}

}

module.exports = DB;