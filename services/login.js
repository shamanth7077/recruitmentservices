var sql = require('mssql');
var config = require('../config.js');

exports.validateLogin = function(body,callback){

var ps = new sql.PreparedStatement();
ps.input('email',sql.VarChar)
ps.prepare('select Email, Password,Auth_Level from Authentication where Email = @email',
            function(err){
              ps.execute({email: body.Email},
                      function(err,recordset){
                        if(err != null){
                          console.log(err);
                        }
                        else {
                          callback(recordset);
                        }
                      })
            });

}
exports.UpdateKey = function(body,key,callback){

var ps = new sql.PreparedStatement();
ps.input('email',sql.VarChar)
ps.input('skey',sql.VarChar)
ps.prepare('update Authentication Set Secret_Key = @skey where Email = @email',
            function(err){
              ps.execute({email: body.Email,skey:key},
                      function(err,recordset,rowcount){
                        if(err != null){
                          console.log(err+'75567');
                        }
                        else {
                          callback(rowcount);
                        }
                      })
            });

}
