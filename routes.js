var express = require('express');
var logincontroller = require('./controllers/logincontroller');
var homecontroller = require('./controllers/homecontroller');
var candidatecontroller = require('./controllers/candidatecontroller');
var employeecontroller = require('./controllers/employeecontroller');
var authmiddleware = require('./middleware/tokenValidation');
var randomstring = require('randomstring');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

module.exports.getRoutes = function(app){

  var router = express.Router();
  var candidaterouter = express.Router();
  var employeerouter = express.Router();
  var loginrouter = express.Router();
  var canauthrouter = express.Router();

  app.use('/dbsecure-can',canauthrouter);

  //Secure-api Validation Middleware
  authmiddleware(app,canauthrouter);

  app.use('/recruitment', router);
  app.use('/candidate', candidaterouter);
  app.use('/employee', employeerouter);
  app.use('/Login', loginrouter);

  homecontroller(app, router);
  candidatecontroller(app,candidaterouter);
  employeecontroller(app,employeerouter);
  logincontroller(app,loginrouter);
}
