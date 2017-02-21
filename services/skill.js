var sql = require('mssql');
var config = require('../config.js');

exports.getSkill = function(callback){
      var request = new sql.Request();
      request.query('SELECT ID, SKILL FROM SKILL', function(err,recordset){
        if(err != null){
          console.log(err);
          callback(err);
        }
        else{
          callback(recordset);
        }
      });
    }
