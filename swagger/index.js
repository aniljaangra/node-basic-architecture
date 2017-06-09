/**
 * Created by Anil Jangra on 1/6/17
 */

const _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    express = require('express'),
    swaggerJSON = require('./swagger-doc');


//======================================= Exports ================================================

module.exports = { addInfo, addModel, addPath, addTags, getSwaggerDoc, mountSwagger };

//======================================= Implementation =========================================

/**
 * Add Server Information
 * @param data
 */
function addInfo(data) {
    const info = _.pick(data, ['title', 'description']);
    //add info data
    if (!_.isEmpty(info)) _.extend(swaggerJSON.info, info);
    //add email if any
    if (data.email) swaggerJSON.info.contact.email = data.email;
    //add host on which your server is running
    if (data.host) swaggerJSON.host = data.host;
    //set base path .. by default its root (/)
    if (data.basePath) swaggerJSON.basePath = data.basePath;
}

/**
 * Add Model Definition
 * @param jsonSchema
 * @param modelName
 */
function addModel(jsonSchema, modelName) {

    if (modelName && !_.isEmpty(jsonSchema)) {
        swaggerJSON.definitions[modelName] = jsonSchema;
    }

}

/**
 * @param tags
 */
function addTags(tags) {
    swaggerJSON.tags.push(...[].concat(tags));
}

function addPath(restPath) {
    //for every path
    // paths.forEach(path => {
        //pick required data
    const data = _.pick(restPath, ['path', 'method', 'summary', 'description', 'parameters', 'responses']);
    if (data.path) {
          //create object
        const pathData = _getBasePath();
        pathData.summary = data.summary;
        pathData.responses = data.responses || {};
        pathData.description = data.description;
        pathData.parameters = data.parameters || [];
        //add path
        _.set(swaggerJSON, `paths.${data.path}.${data.method.toLowerCase()}`, pathData);
    }
    // });
}

function getSwaggerDoc() {
    return swaggerJSON;
}

function mountSwagger(app, swaggerPath, serverConfig) {
    //swagger document path
    app.get('/swagger.json', (req, res) => res.send(getSwaggerDoc()));
    _addSwaggerPath(app, swaggerPath);
    _updateSwaggerHTML(swaggerPath, serverConfig.host, serverConfig.port);
}
//======================================= Helper Functions =========================================

function _getBasePath() {
    return {
        security: [{
            api_key: []
        }],
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json'
        ]
    };
}

function _addSwaggerPath(app, swaggerDir) {
  //Swagger Page
    const swagger_path = express.static(swaggerDir);
    app.get(/^\/explorer(\/.*)?$/, (req, res, next) => {
        if (req.url === '/explorer') { // express static barfs on root url w/o trailing slash
            res.writeHead(302, { Location: `${req.url}/` });
            return res.end();
        }
    // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/explorer'.length);
        return swagger_path(req, res, next);
    });
}

function _updateSwaggerHTML(swaggerDir, host, port) {
    const file = path.join(swaggerDir, 'index.html');
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        if (!_.includes(data, 'http://petstore.swagger.io/v2/swagger.json')) {
            return;
        }
        const result = data.replace('http://petstore.swagger.io/v2/swagger.json', `http://${host}:${port}/swagger.json`);
        fs.writeFile(file, result, 'utf8', error => {
            if (err) return console.log(error);
        });
    });
}
