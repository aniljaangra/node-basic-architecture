class Controller{

  constructor(Model){
    this.Model = Model;
    _bindAll(this);
  }

  create( req, res){
    this.Model.create(req.body).then( data => res.send(data));
  }

  find( req, res){
    this.Model.find().then( data => res.send(data));
  }

}

module.exports = Controller;

/**
 * Binds All Methods with object so that they can work as an route handler
 * @param object
 * @private
 */
function _bindAll(object) {
  //fetch subclass property list
  var objectMembers = Object.getOwnPropertyNames(object.constructor.prototype);
  //fetch base class property list
  var baseClassMembers = Object.getOwnPropertyNames(Object.getPrototypeOf(object.constructor).prototype);
  //ignore constructor
  var propList =  objectMembers.concat(baseClassMembers);
  //bind every function
  propList.forEach( function (property) {
    //ignore constructor
    if(property !== "constructor" && object.__proto__[property] && typeof object.__proto__[property] === "function"){
      object.__proto__[property] = object[property].bind(object);
    }
  })
}