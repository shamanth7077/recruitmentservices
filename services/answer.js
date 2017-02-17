var sql = require('mssql');
var config = require('../config.js');

exports.getSubmittedAnswer = function(id,callback){
  var ps = new sql.PreparedStatement();
  ps.input('candidateId')
  ps.prepare('Select Question,Answer from Test Where Candidate_Id = @candidateId', function(err){
    ps.execute({candidateId:id},function(err,rec){
      if(err != null){
        console.log(err)
      }
      else{
        callback(rec);
      }
    })
  })
}
