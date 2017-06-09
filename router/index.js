/**
 * Created by Anil Jangra on 1/6/17
 */

const userRouter = require('./user-router');

//======================================= Exports ================================================

module.exports = { init: setUp };

//======================================= Exports ================================================

function setUp(app) {

  app.use('/user', userRouter);

}