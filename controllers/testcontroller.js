var test = require('../services/test');
var bodyParser = require('body-parser');
var submit = require('../services/submit');
var mailer = require('../services/mailer');
var logger = require('../logger');
var jsonParser = bodyParser.urlencoded({extended:true});
var simpleparser = bodyParser.json();

module.exports = function(app,testrouter,id,pw){
  logger.info('Inside test controller: id:' + id);
    testrouter.get('/questionset', function(request,response){

    test.Validate(id,function(recordset,exp){
      logger.info('Inside test controller: recordset:' + recordset);
      if (recordset.length == 0){
        logger.info('Inside test controller: recordset:' + recordset);
        response.status(404).json({status:"Id NotFound"});
      }
      else{
              logger.info('Inside test controller: exp:' + exp[0].Skill + exp[0].Email);
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
    console.log(id,pw);
      submit.getCandidateId(id, function(recordset){
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
              submit.done(recordset,id,function(TestComplete){
                  if(TestComplete != 0){
                    console.log(TestComplete);
					          mailer('r34akctd@danskebank.dk','','S',id);
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
