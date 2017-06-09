/**
 * Created by Anil Jangra on 31/5/17
 */
const BaseController = require('./base-controller'),
    userModel = require('../model/user');

//======================================= Implementation =========================================


class UserController extends BaseController {

    constructor(Model) {
        super(Model);
    }
}

//======================================= Exports ================================================

module.exports = new UserController(userModel);
