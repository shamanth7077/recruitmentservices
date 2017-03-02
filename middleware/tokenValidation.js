var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var evaluationcontroller = require('../controllers/evaluationController');
var testcontroller = require('../controllers/testcontroller');
var evalsummarycontroller = require('../controllers/evalsummarycontroller');
var getSecret = require('../services/key');
var logger = require('../logger');

module.exports = function(app,canauthrouter){

  canauthrouter.use(function(request,response,next){
    var token = request.headers['acc-token'];

    getSecret.getKey(function(key){
        logger.info(token+':token received');
        if(token){
            jwt.verify(token,key,function(err,decode){
              if(err){
                logger.error('err:'+ err);
                response.status(500).json("Invalid Token");
              }
              else{
                console.log(request.url);
                var URL = String(request.url).split('=');
                logger.info(URL[0]);
                if((request.url=='/submit' || request.url=='/questionset') && decode.Auth_Level == 10){
                  logger.info(decode);
                  rem1(decode.Email,decode.Password);
                  next();
                }
                else if(((URL[0])=='/answers?Email' || request.url=='/submiteval' || request.url=='/saveeval' || request.url=='/summary') && (decode.Auth_Level == 30 || decode.Auth_Level == 20)){
                  logger.info(decode);
                  rem2();
                  next();
                }
                else{
                  response.status(403).json("Forbidden - Authentication Failed1");
                }
              }
            })
        }
        else{
          response.status(403).json("Forbidden - Authentication Failed3");
        }
    });
  });

  var rem1 = function(id,pw){
    logger.info(id+':id'+','+pw+':pw');
    testcontroller(app, canauthrouter,id,pw);
  }
  var rem2 = function()
  {
    evaluationcontroller(app, canauthrouter);
    evalsummarycontroller(app, canauthrouter);
  }
}
