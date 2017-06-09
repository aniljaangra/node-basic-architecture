const User = require('../model/user-schema');
const Controller = require('../controller/base-controller');


class UserController extends Controller{

  constructor(Model){
    super(Model);
  }

  profile(req,res){
    this.Model.findOne().then(res.send.bind(res));
  }

}

module.exports = new UserController(User);