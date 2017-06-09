/**
 * Created by anil on 31/5/17.
 */
const app = require('express')(),
    config = require('config'),
    //configure logger
    logger = require('./util/logger').configure(`${__dirname}/logs`),
    middleWares = require('./middleware'),
    dbConfig = require('./dao/dao.config'),
    swagger = require('./swagger/swagger-init'),
    router = require('./router');

//declare middlewares
middleWares.init(app);

// initialize db
dbConfig.init();

//set up router
router.init(app);

//integrate swagger
swagger.init(app);

//start server on configured port
app.listen(config.server.port, () => logger.verbose(`Explore APIs on http://${config.server.host}:${config.server.port}/explorer ..`));

module.exports = app;
