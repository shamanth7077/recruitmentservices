var details = require('../services/details');
var answer = require('../services/answer');
var eval = require('../services/eval');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

module.exports = function(app,evaluationrouter){
  evaluationrouter.get('/answers', function(request,response){
    details.getCandidateDetails(request.query,function(recordset){
      if (recordset == null){
        response.status(404).json("No records found");
      }
      else{
        if(recordset.Status == 3){
          answer.getSubmittedAnswer(recordset.ID,function(rec){
            response.status(200).json({recordset,rec});
          });
        }
        else {
          response.status(404).json('Test not completed');
        }
      }
    });
    })

  evaluationrouter.post('/submiteval',jsonParser,function(request,response){
    var count = 0
    for(var i=0;i<request.body.Evaluation.length; i++){

      eval.submitEvaluation(request.body.Candidate_ID,request.body.Evaluation[i],function(result){
        if(result != 0){
          count += result;
          if(count == request.body.Evaluation.length - 1){
              eval.Score(request.body.Candidate_ID,request.body.Score,function(res){
                if(res != 0){
                  response.status(200).json({"Status":"Evaluated"});
                }
                else{
                  response.status(500).json('Server Error');
                }
              });
          }
        }
        else{
            response.status(500).json('Server Error');
        }
      });
    }
  });


  evaluationrouter.post('/saveeval',jsonParser,function(request,response){
    var count = 0
    for(var i=0;i<request.body.Evaluation.length; i++){

      eval.submitEvaluation(request.body.Candidate_ID,request.body.Evaluation[i],function(result){

        if(result != 0){
          count += result;
          console.log(count+' result')
          if(count == request.body.Evaluation.length){
            response.status(200).json({"Status":"Saved"});
          }
        }
        else{
          console.log(count +' count');
            response.status(500).json('Server Error');
        }
      });
    }
  });
}
