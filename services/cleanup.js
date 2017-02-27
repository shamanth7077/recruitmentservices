var sql = require('mssql');
var config = require('../config.js');
var logger = require('../logger.js');

exports.cleanAuth = function(callback){

      var request = new sql.Request();
      request.query('Delete from Authentication', function(err,recordset,affected){
        if(err != null){
          console.log(err);
          logger.error(err);
          callback(err);
        }
        else{
			logger.info(recordset);
          callback(affected);
        }
      });
    }
exports.cleanCan = function(callback){

      var request = new sql.Request();
      request.query('Delete from Candidate', function(err,recordset,affected){
        if(err != null){
          console.log(err);
          logger.error(err);
          callback(err);
        }
        else{
			logger.info(recordset);
          callback(affected);
        }
      });
    }
    exports.cleanEmp = function(callback){

          var request = new sql.Request();
          request.query('Delete from UserList', function(err,recordset,affected){
            if(err != null){
              console.log(err);
              logger.error(err);
              callback(err);
            }
            else{
    			logger.info(recordset);
              callback(affected);
            }
          });
        }
