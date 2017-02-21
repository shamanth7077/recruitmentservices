var register = require('../services/register');
var randomstring = require('randomstring');
var yyyymmdd = require('yyyy-mm-dd');
var bodyParser = require('body-parser');
var moment = require('moment');
var jsonParser = bodyParser.urlencoded({extended:true});
var fileupload = require('express-fileupload');
var mailer = require('../services/mailer');


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
                  mailer(request.body.Email,rand_key,'C',request.body.Name);
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
  });

  candidaterouter.use(fileupload());
  candidaterouter.post('/upload',function(req,res){
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.resume;
      console.log(req.files.resume);
      console.log(req.files.resume.name);
      console.log('../Resume/'+req.files.resume.name);
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('Resume/'+req.files.resume.name, function(err) {
        if (err)
          return res.status(500).send(err);

        res.send('File uploaded!');
      });
  });
}
