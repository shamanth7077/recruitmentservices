var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateInfo = function(query,callback){
  var request = new sql.Request();
  request.query('select ID,Name,Email,Experience,Registration_Date,Skill,Score,Consultant_Name,Logic_Score,Status from Candidate', function(err,recordset){
    if(err != null){
      console.log(err);
    }
    else{
      console.log('inside else');
      console.log(recordset.length);
      if(recordset.length > 0){
        for (var i = 0; i < recordset.length; i++){
          console.log('inside for');
          console.log(typeof recordset[i].Registration_Date);
          console.log(recordset[i].Registration_Date);
          recordset[i].Registration_Date = JSON.stringify(recordset[i].Registration_Date).replace('"',"").split("T")[0];
          console.log(recordset[i].Registration_Date);
          console.log(i);
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
