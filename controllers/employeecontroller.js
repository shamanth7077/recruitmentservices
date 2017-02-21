var registerEmp = require('../services/registerEmp');
var randomstring = require('randomstring');
var bodyParser = require('body-parser');
var moment = require('moment');
var mailer = require('../services/mailer');

var jsonParser = bodyParser.urlencoded({extended:true});


module.exports = function(app, employeerouter){
  employeerouter.post('/register', jsonParser, function(request,response){
    var eid = String(request.body.Email);
    console.log(eid);
    var id = eid.split("@").pop();
    console.log(id);
    if(id == 'danskeit.co.in'|| id == 'danskebank.dk'){
      registerEmp.getEmployeeRegistered(request.body.Email,function(recordset){
          if (recordset.length == 0){
            var rand_key = randomstring.generate(10);
            registerEmp.registerEmployee(request.body,rand_key,function(success){
              if (success != 0){
                registerEmp.generateEmpAuth(request.body,rand_key,function(done){
                  if(done != 0){
                    mailer(request.body.Email,rand_key,'E',request.body.Name);
                    response.status(200).json('Registration Done');
                  }
                  else{
                    response.status(500).json('Server Error');
                  }
                });
              }
              else{
                response.status(500).json('Server Error');
              }
            });
          }
         else {
            response.json('Already Registered');
          }
      });
    }
    else {
      response.status(403).json('forbidden');
    }
  });



}
