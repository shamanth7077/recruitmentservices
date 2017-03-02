var sql = require('mssql');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var login = require('../services/login');
var getSecret = require('../services/key');
var logger = require('../logger');


var jsonParser = bodyParser.urlencoded({extended:true});

module.exports = function(app,loginrouter){
  loginrouter.post('/auth',jsonParser,function(request,response){
  console.log(request.url);
  login.validateLogin(request.body,function(recordset){
    if (recordset.length == 0){
      response.status(401).json({status:"Invalid Credential"});
    }
    else{
      console.log(recordset[0].Password,request.body.Password);
      if(recordset[0].Password == null || recordset[0].Password != request.body.Password){
        response.status(401).json({status:"Key used/Invalid"});
      }
      else {
            getSecret.getKey(function(key){
                process.env.SECRET_KEY = key;
                var userObj = {
                  Email:recordset[0].Email,
                  Password: recordset[0].Password,
                  Auth_Level: recordset[0].Auth_Level
                }
                var auth = jwt.sign(userObj,process.env.SECRET_KEY,{
                  expiresIn: 5200
                });
                logger.info('Token Generated: ' + auth);
                response.status(200).json({Token:auth});
            });
          }
      }
  });
});
}
