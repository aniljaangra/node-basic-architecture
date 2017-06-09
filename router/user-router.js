const Router   = require('express').Router;
const router   = new Router();
const _        = require('lodash');
const UserCtrl = require('../controller/user-controller');


router
  .post('/create' , UserCtrl.create )
  .get('/find' , UserCtrl.find)
  .get('/profile' , UserCtrl.profile)

module.exports = router;