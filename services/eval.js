var sql = require('mssql');
var config = require('../config.js');

exports.submitEvaluation = function(Candidate_ID,body,callback){
  body.forEach(function(value){
    var ps = new sql.PreparedStatement();
    ps.input('q_id',sql.Int)
    ps.input('cid',sql.Int)
    ps.input('stat',sql.VarChar)

    ps.prepare('Update Test Set Status = @stat where Candidate_ID=@cid and Question_ID=@q_id',function(err){
      console.log(value.ID)
      ps.execute({q_id:value.Question_Id,cid:Candidate_ID,stat:value.Status}, function(err,recordset,rowcount){

        if(err != null){
          console.log(err);
        }
        else{
          console.log(rowcount);
          callback(rowcount);
        }
      })
    });
  });
}

exports.Score = function(can_Id,score,callback){
  var ps1 = new sql.PreparedStatement();
  ps1.input('cid',sql.Int)
  ps1.input('testStat',sql.VarChar)
  ps1.input('sr',sql.VarChar)
  ps1.prepare('Update Candidate Set Score = @sr, testStat:4 where ID=@cid', function(err){
    ps1.execute({cid:can_Id,sr:score}, function(err,recordset,commit){
      if(err != null){
        console.log(err.msg+'Update');
      }
      else callback(commit);
    })
  });
}
