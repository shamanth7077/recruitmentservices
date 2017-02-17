var register = require('../services/register');
var randomstring = require('randomstring');
var yyyymmdd = require('yyyy-mm-dd');
var bodyParser = require('body-parser');
var moment = require('moment');

var jsonParser = bodyParser.urlencoded({extended:true});


module.exports = function(app, candidaterouter){
  candidaterouter.post('/register', jsonParser, function(request,response){
    register.getCandidateRegistered(request.body.Email,function(recordset){
        if (recordset.length == 0){
          var rand_key = randomstring.generate(10);
          var date = new Date();
          date = moment(date).format("YYYY-MM-DD HH:mm:ss");
          var Id = randomstring.generate({
            length:9,
            charset:'numeric'
          });
          register.registerCandidate(request.body,rand_key,Id,date,function(success){
            if (success != 0){
              register.generateAuth(request.body,rand_key,function(done){
                if(done != 0){
                  response.status(200).json('Registration Done' + rand_key);
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
  });



}
