const mongoose = require('mongoose');
const argv = require('yargs').argv;

const schemas = {
	User: require('./../schemas/User'),
	Opportunity: require('./../schemas/Opportunity')
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