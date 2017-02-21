var sql = require('mssql');
var config = require('../config.js');

exports.getKey = function(callback){
      var request = new sql.Request();
      request.query('SELECT * from Secret', function(err,recordset){
        if(err != null){
          console.log(err);
        }
        else{          
          callback(recordset[0].Key);
        }
      });
    }
