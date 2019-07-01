const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const configJSONPath = path.join(__dirname, `config.${env}.json`);

const config_json = JSON.parse(fs.readFileSync(configJSONPath, 'utf8'));

module.exports = config_json;