var sql = require('mssql');
var config = require('../config.js');

exports.validateLogin = function(body,callback){

var ps = new sql.PreparedStatement();
ps.input('email',sql.VarChar)
ps.prepare('select Email, Password,Auth_Level from Authentication where Email = @email',
            function(err){
              ps.execute({email: body.Email},
                      function(err,recordset){
                        ps.unprepare(function(err) {

                        });
                        if(err != null){
                          console.log(err);
                        }
                        else {
                          callback(recordset);
                        }
                      })
            });

}
