var details = require('../services/details');
var answer = require('../services/answer');
var eval = require('../services/eval');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.urlencoded({extended:true});

module.exports = function(app,evaluationrouter){
  evaluationrouter.get('/answers', function(request,response){
    details.getCandidateDetails(request.query,function(recordset){
      if (recordset[0] == null){
        response.status(404).json("No records found");
      }
      else{
        if(recordset[0].Status == 3){
          answer.getSubmittedAnswer(recordset[0].id,function(rec){
            response.status(200).jon(recordset[0],rec);
          });
        }
        else {
          response.status(404).json('Not Found');
        }
      }
    });
    })

  evaluationrouter.post('/submiteval',jsonParser,function(request,response){
    eval.submitEvaluation(request.body.Candidate_ID,request.body.Evaluation,function(result){
      if(result != 0){
        eval.Score(request.body.Candidate_ID,request.body.Score,function(res){
          if(res != 0){
            response.status(200).json({"Status":"Evaluated"});
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
  });

  evaluationrouter.post('/saveeval',jsonParser,function(request,response){
    eval.submitEvaluation(request.body.Candidate_ID,request.body.Evaluation,function(result){
      if(result != 0){
            response.status(200).json({"Status":"Saved"});
      }
      else{
        response.status(500).json('Server Error');
      }
    });
  })
}
