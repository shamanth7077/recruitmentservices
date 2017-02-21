var sql = require('mssql');
var config = require('../config.js');
var logger = require('../logger.js');

exports.getSkill = function(callback){
      var request = new sql.Request();
      request.query('SELECT ID, SKILL FROM SKILL', function(err,recordset){
        if(err != null){
          console.log(err);
          logger.error(err);
          callback(err);
        }
        else{
          callback(recordset);
        }
      });
    }
