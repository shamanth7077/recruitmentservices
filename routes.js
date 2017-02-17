var express = require('express');
var logincontroller = require('./controllers/logincontroller');
var homecontroller = require('./controllers/homecontroller');
var candidatecontroller = require('./controllers/candidatecontroller');
var testcontroller = require('./controllers/testcontroller');
var evaluationcontroller = require('./controllers/evaluationController');
var employeecontroller = require('./controllers/employeecontroller');
var randomstring = require('randomstring');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

module.exports.getRoutes = function(app){

  var decode = {};

  var router = express.Router();
  var candidaterouter = express.Router();
  var employeerouter = express.Router();
  var loginrouter = express.Router();
  var canauthrouter = express.Router();
  var empauthrouter = express.Router();




  app.use('/dbsecure-emp',empauthrouter);
  app.use('/dbsecure-can',canauthrouter);

  //Candidate Validation Middleware
  canauthrouter.use(function(request,response,next){
    var token = request.headers['acc-token'];
    var key =  request.headers['key'];
    if(token && key){
      if(key == process.env.SECRET_KEY){
        console.log(process.env.SECRET_KEY);
        jwt.verify(token,key,function(err,decode){
          if(err){
            response.status(500).json("Invalid Token");
          }
          else{
            if(decode.Auth_Level == 10){
              console.log(decode)
              rem(decode.Email,decode.Password);
              next();

            }
            else{
              response.status(403).json("Forbidden - Authentication Failed1");
            }
          }
        })
      }
      else{
        response.status(403).json("Forbidden - Authentication Failed2");
      }
    }
    else{
      response.status(403).json("Forbidden - Authentication Failed3");
    }
  });

  //Candidate Validation Middleware
  empauthrouter.use(function(request,response,next){
    var token =  request.headers['acc-token'];
    var key = request.headers['key'];
    if(token && key){
      if(key == process.env.SECRET_KEY){
        jwt.verify(token,key,function(err,decode){
          if(err){
            response.status(500).json("Invalid Token");
          }
          else{
            if(decode.Auth_Level == 20 || decode.Auth_Level == 30){
              next();
            }
            else{
              response.status(403).json("Forbidden - Authentication Failed");
            }
          }
        })
      }
      else{
        response.status(403).json("Forbidden - Authentication Failed");
      }
    }
    else{
      response.status(403).json("Forbidden - Authentication Failed");
    }
  });


  app.use('/recruitment', router);
  app.use('/candidate', candidaterouter);
  canauthrouter.use('/test', canauthrouter);
  app.use('/evaluation',empauthrouter);
  app.use('/employee', employeerouter);
  app.use('/Login', loginrouter);

  homecontroller(app, router);
  candidatecontroller(app,candidaterouter);

  employeecontroller(app,employeerouter);
  logincontroller(app,loginrouter);

  var rem = function(id,pw){
    testcontroller(app, canauthrouter,id,pw);
    evaluationcontroller(app,empauthrouter, decode);
  }


}
