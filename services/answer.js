var sql = require('mssql');
var config = require('../config.js');

exports.getSubmittedAnswer = function(id,callback){
  var ps = new sql.PreparedStatement();
  ps.input('candidateId',sql.Int)
  ps.prepare('Select Question_ID,Question,Answer from Test Where Candidate_Id = @candidateId', function(err){
    ps.execute({candidateId:id},function(err,rec){
      ps.unprepare(function(err) {

      });
      if(err != null){
        console.log(err +' 890')
      }
      else{
        callback(rec);
      }
    })
  })
}
