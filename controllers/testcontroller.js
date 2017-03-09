var test = require('../services/test');
var bodyParser = require('body-parser');
var submit = require('../services/submit');
var mailer = require('../services/mailer');
var logger = require('../logger');
var jsonParser = bodyParser.urlencoded({extended:true});
var simpleparser = bodyParser.json();

module.exports = function(app,testrouter,id,pw){
  app.locals.id = id;
  app.locals.pw = pw;
    testrouter.get('/questionset', function(request,response){
      var userid = request.app.locals.id;
      var password = request.app.locals.pw;
    test.Validate(userid,function(recordset,exp){
      if (recordset.length == 0){
        response.status(404).json({status:"Id NotFound"});
      }
      else{
        logger.info(recordset);
        logger.info(recordset[0].Password);
        logger.info(pw);
        if(recordset[0].Password == null || recordset[0].Password != password){
          response.status(404).json({status:"Key used/Invalid"});
        }
        else {
              test.GetQuestionSet(exp[0],1, function(finalRec){
                if(finalRec.length == 0){
                  response.status(404).json({status:"No mactching Questions"});
                }
                else{
                  test.removePassword(userid,function(update){
                    if(update != 0)
                    {
                      response.status(200).json(finalRec)
                    }
                    else{
                      response.status(404).json({status:"No mactching Questions"})
                    }
                  });
                }
            });
          }
        }
    });
  });

  testrouter.post('/submit', simpleparser, function(request,response){
    var userid = request.app.locals.id;
    var ctr=0;
      submit.getCandidateId(userid, function(recordset){
        if (recordset.length != 0 && recordset[0].Status == 1){
          logger.info(request.body);
          logger.info(request.body.Answers.length);
          logger.info(recordset, recordset[0]);
          for(i=0;i<request.body.Answers.length;i++){
            submit.submitAnswer(request.body.Answers[i],recordset,function(result){
            console.log(result +' :result');
            if (result != 0){
              ctr +=result;
                if(ctr == request.body.Answers.length)
                {
                  submit.done(recordset,userid,function(TestComplete){
                      if(TestComplete != 0){
    					          mailer('r34akctd@danskebank.dk','','S',userid);
                        console.log('maildone');
                        response.json({Status:"submitted"});
                      }
                      else{response.json({Status:"Test not submitted1"});}
                    });
                }
            }
          });
          }
        }
        else{
          response.json({Status:"Already Taken"});
        }
      });
  });
}
