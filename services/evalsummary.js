var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateInfo = function(query,callback){
  var request = new sql.Request();
  request.query('select ID,Name,Experience,Skill,Score,Consultant_Name,Logic_Score,Status from Candidate', function(err,recordset){
    if(err != null){
      console.log(err);
    }
    else{
      callback(recordset);
    }
  });
  }
