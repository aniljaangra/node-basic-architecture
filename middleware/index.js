/**
 * This file mounts all required middlewares to express app
 * @type {middlewareWrapper}
 */
const cors = require('cors'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    { isTest } = require('config');

//======================================= Exports ================================================

module.exports = { init: setUp };

//======================================= Implementation =========================================

/**
 * This Method Initiates all middlewares and put them on app
 * @param server
 */
function setUp(server) {

    //secure server
    server.use(helmet());

    // compress all requests
    server.use(compression());

    //Add Body parser
    server.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    server.use(bodyParser.json());

    //log http requests
    if (!isTest ) server.use(morgan('common'));

    //configure cross origin policy
    server.use(cors({
        // origin: ["http://localhost:3001"],
        // methods: ["GET", "POST"],
        // allowedHeaders: ["Content-Type", "Authorization"]
    }));

    // add server status route on root

}
