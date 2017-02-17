var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateDetails = function(query,callback){
  var ps = new sql.PreparedStatement();
  ps.input('email', sql.VarChar)
  ps.prepare('Select ID,Name,Experience,Skill,Score,Consultant_Name,Status,Logic_Score'+
  'from Candidate where Email= @email',function(err){
    ps.execute({email : query.Email},function(err,recordset){
      if(err != null){
        console.log(err)
      }
      else{
        callback(recordset);
      }
    });
  })
}
