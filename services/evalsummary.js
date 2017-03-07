var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateInfo = function(query,callback){
  var request = new sql.Request();
  request.query('select a.ID,Name,Email,Experience,Registration_Date,Skill,Score,Consultant_Name,Logic_Score,b.Status from Candidate a, Status b where a.Status = b.ID', function(err,recordset){
    if(err != null){
      console.log(err);
    }
    else{
      console.log('inside else');
      console.log(recordset.length);
      if(recordset.length > 0){
        for (var i = 0; i < recordset.length; i++){
          recordset[i].Registration_Date = JSON.stringify(recordset[i].Registration_Date).replace('"',"").split("T")[0];
          if(i === recordset.length -1){
            console.log(recordset);
            callback(recordset);
          }
        }
     }
     else{
       callback(recordset);
     }
    }
  });
  }
