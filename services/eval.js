var sql = require('mssql');
var config = require('../config.js');

exports.submitEvaluation = function(Candidate_ID,body,callback){
    var ps = new sql.PreparedStatement();
    ps.input('q_id',sql.Int)
    ps.input('cid',sql.Int)
    ps.input('stat',sql.VarChar)

    ps.prepare('Update Test Set Status = @stat where Candidate_ID=@cid and Question_ID=@q_id',function(err){
      console.log(body.Question_Id + ' id')
      ps.execute({q_id:body.Question_Id,cid:Candidate_ID,stat:body.Status}, function(err,recordset,rowcount){

        if(err != null){
          console.log(err +' 678');
        }
        else{
          console.log(rowcount + ' rowcount');
          callback(rowcount);
        }
        ps.unprepare(function(err) {
          if(err){
            console.log(err);
          }
        });
      })
    });
}

exports.Score = function(can_Id,score,callback){
  var ps1 = new sql.PreparedStatement();
  ps1.input('cid',sql.Int)
  ps1.input('testStat',sql.VarChar)
  ps1.input('sr',sql.Numeric(5,2))
  ps1.prepare('Update Candidate Set Score = @sr, Status=@testStat where ID=@cid', function(err){
    ps1.execute({cid:can_Id,sr:score,testStat:4}, function(err,recordset,commit){
      ps1.unprepare(function(err) {

      });
      if(err != null){
        console.log(err+' Update');
      }
      else callback(commit);
    })
  });
}
