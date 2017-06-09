/**
 * Created by Anil Jangra on 31/5/17
 */
const mongoose = require('mongoose'),
    { isTest, mongodb } = require('config'),
    { host, port, db, userName, password } = mongodb,
    logger = require('../util/logger').getTaggedLogger('mongoose'),
    Promise = require('bluebird');

//Set Promise to Bluebird
mongoose.Promise = Promise;

//Turn on Debugging
if (!isTest) mongoose.set('debug', true);

//======================================= Exports ================================================

module.exports = { init };

//======================================= Implementation =========================================

/**
 * Initialize mongoose
 */
function init() {

    //connect to mongodb
    mongoose.connect(`${host}:${port || 27017}/${db}`, { user: userName, pass: password });

    //log status
    mongoose.connection.on('connected', () => logger.debug('MongoDB Successfully Connected.'));
    mongoose.connection.on('error', (err) => logger.debug('Error Connecting MongoDB.', err));
}
