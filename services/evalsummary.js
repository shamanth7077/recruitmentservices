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
          switch(recordset[i].Status){
            case 1:
            recordset[i].Status = "Profile Received";
            break;
            case 2:
            recordset[i].Status = "Test Pending";
            break;
            case 3:
            recordset[i].Status = "Test Completed";
            break;
            case 4:
            recordset[i].Status = "Test Evaluated";
            break;
            case 5:
            recordset[i].Status = "Tech Completed";
            break;
            case 6:
            recordset[i].Status = "Vertical Completed";
            break;
            case 7:
            recordset[i].Status = "Selected";
            break;
            case 8:
            recordset[i].Status = "Rejected";
            break;
            case 9:
            recordset[i].Status = "On Hold";
            break;
            case 10:
            recordset[i].Status = "Offered";
          }
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
