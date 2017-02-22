var test = require('../services/test');
var bodyParser = require('body-parser');
var submit = require('../services/submit');

var jsonParser = bodyParser.urlencoded({extended:true});
var simpleparser = bodyParser.json();

module.exports = function(app,testrouter,id,pw){
    testrouter.get('/questionset', function(request,response){

    test.Validate(id,function(recordset,exp){
      if (recordset.length == 0){
        console.log(recordset);
        response.status(404).json({status:"Id NotFound"});
      }
      else{
        console.log(recordset[0].Password);
        if(recordset[0].Password == null || recordset[0].Password != pw){
          response.status(404).json({status:"Key used/Invalid"});
        }
        else {
          test.GetLevel(exp[0], function(rec){
            if(rec.length ==0){
              console.log(rec);
              response.status(404).json({status:"No mactching Question level"});
            }
            else{
              rec.sort(function(a,b){
                return b.Experience - a.Experience
              })
              console.log(rec);
              test.GetQuestionSet(exp[0],rec[0], function(finalRec){
                if(finalRec.length == 0){
                  response.status(404).json({status:"No mactching Questions"});
                }
                else{
                  response.status(200).json(finalRec)
                }
              });
            }
          });
        }
      }
    });
  });

  testrouter.post('/submit', simpleparser, function(request,response){
    console.log(id,pw);
      submit.getCandidateId(id, function(recordset){
        var ctr=0;
        if (recordset.length != 0 && recordset[0].Status == 1){
          console.log(request.body.Answers.length);
          for(i=0;i<request.body.Answers.length;i++){
            var result = submit.submitAnswer(request.body.Answers[i],recordset);
            console.log(result);
            if (result != 0 || result != null){
              ctr=i;
            }
            console.log(ctr);
            if(ctr == request.body.Answers.length - 1){
              submit.done(recordset,id,function(TestComplete){
                  if(TestComplete != 0){
                    console.log(TestComplete);
					mailer('TBIT-Recruitment@danskeit.co.in','','S',id);
                    response.json({Status:"submitted"});
                  }
                  else{response.json({Status:"Test not submitted1"});}
                });
            }
          }
        }
        else{
          response.json({Status:"Already Taken"});
        }
      });
  });
}
