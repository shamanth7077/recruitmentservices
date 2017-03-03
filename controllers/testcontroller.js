var test = require('../services/test');
var bodyParser = require('body-parser');
var submit = require('../services/submit');
var mailer = require('../services/mailer');
var logger = require('../logger');
var jsonParser = bodyParser.urlencoded({extended:true});
var simpleparser = bodyParser.json();

module.exports = function(app,testrouter,id,pw){
  app.locals.id = id;
    testrouter.get('/questionset', function(request,response){
      var userid = request.app.locals.id;
    test.Validate(userid,function(recordset,exp){
      if (recordset.length == 0){
        response.status(404).json({status:"Id NotFound"});
      }
      else{
              test.GetQuestionSet(exp[0],1, function(finalRec){
                if(finalRec.length == 0){
                  response.status(404).json({status:"No mactching Questions"});
                }
                else{
                  response.status(200).json(finalRec)
                }
              });
        }
    });
  });

  testrouter.post('/submit', simpleparser, function(request,response){
    var userid = request.app.locals.id;
      submit.getCandidateId(userid, function(recordset){
        var ctr=0;
        if (recordset.length != 0 && recordset[0].Status == 1){
          console.log(request.body);
          console.log(request.body.Answers.length);
          console.log(recordset, recordset[0]);
          for(i=0;i<request.body.Answers.length;i++){
            submit.submitAnswer(request.body.Answers[i],recordset,function(result){
            console.log(result +' :result');
            if (result != 0){
              ctr=i;
            }
          })
          }
            console.log(ctr +': counter');
              submit.done(recordset,userid,function(TestComplete){
                  if(TestComplete != 0){
					          mailer('r34akctd@danskebank.dk','','S',userid);
                    response.json({Status:"submitted"});
                  }
                  else{response.json({Status:"Test not submitted1"});}
                });
        }
        else{
          response.json({Status:"Already Taken"});
        }
      });
  });
}
