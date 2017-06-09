/**
 * Created by Anil Jangra on 1/6/17
 */
const swagger = require('./'),
    path = require('path'),
    config = require('config'),
    models = require('../model');
//======================================= Exports ================================================

module.exports = { init: setUp };

//======================================= Implementation =========================================

function setUp(app) {
    //add information to swagger
    swagger.addInfo({
        host: `${config.server.host}:${config.server.port}`,
        title: 'User Management',
        description: 'User Management App'
    });
    //add model definitions to swagger
    for (const modelName in models) {
        const model = models[modelName];
        swagger.addModel(model.toJSONSchema(), modelName.toLowerCase());
    }
    swagger.addTags([{ name: 'User', description: 'ThinkSys user' }]);

    //mount swagger
    swagger.mountSwagger(app, path.join(__dirname, '../node_modules/swagger-ui-dist'), config.server);
}


