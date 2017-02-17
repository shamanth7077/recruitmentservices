var sql = require('mssql');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var login = require('../services/login');


var jsonParser = bodyParser.urlencoded({extended:true});

module.exports = function(app,loginrouter){
  loginrouter.post('/auth',jsonParser,function(request,response){
  process.env.SECRET_KEY = randomstring.generate(256);
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
        login.UpdateKey(recordset[0],process.env.SECRET_KEY,function(rowcount){
          if(rowcount != 0){
            var userObj = {
              Email:recordset[0].Email,
              Password: recordset[0].Password,
              Auth_Level: recordset[0].Auth_Level
            }
            var auth = jwt.sign(userObj,process.env.SECRET_KEY,{
              expiresIn: 3600
            });
            response.status(200).json({Token:auth,Key:process.env.SECRET_KEY});
          }
            else{
              response.status(500).json('Server Error');
            }
        });
        }
      }
    });
  });
}
