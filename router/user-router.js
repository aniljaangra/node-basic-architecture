
const router = require('express').Router(),
    addPathToSwagger = require('../swagger').addPath,
    userController = require('../controller/user-controller');


router
  .post('/', __(userController.create))
  .get('/', __(userController.find))
  .delete('/', __(userController.remove));

module.exports = router;

function __(route) {
    addPathToSwagger(route.definition);
    return route.handler.bind(userController);
}
