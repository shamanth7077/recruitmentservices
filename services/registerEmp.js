var sql = require('mssql');
var config = require('../config.js');

exports.getEmployeeRegistered = function(emailId,callback){
      var ps = new sql.PreparedStatement();
      ps.input('email',sql.VarChar)
      ps.prepare('select Email from Authentication where Email = @email',
                  function(err){
                    ps.execute({email: emailId},
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
    exports.registerEmployee = function(body,key,Id,date,callback){
          var ps = new sql.PreparedStatement();
          ps.input('Name',sql.NVarChar)
          ps.input('Email',sql.NVarChar)
          ps.input('Skill',sql.NVarChar)
          ps.input('Role',sql.NVarChar)
          ps.prepare('insert into Employee values'+
          '(@Name,@Email,@Skill,@Role)',
                      function(err){
                        ps.execute({Name:body.Name,Email:body.Email,
                                    Skill:body.Skill,
                                    Role:body.Role},
                                function(err,recordset,rowcount){
                                  if(err != null){
                                    console.log(err + '123');
                                  }
                                  else {
                                    callback(rowcount);
                                  }
                                })
                      });

        }

        exports.generateEmpAuth = function(body,key,callback){
          var AuthLevel = 0;
          if(body.Role == 'Admin'){
            AuthLevel = 30;
          }
          else{
            AuthLevel = 20;
          }
          var ps1 = new sql.PreparedStatement();
          ps1.input('S_key',sql.VarChar)
          ps1.input('EmailId',sql.VarChar)
          ps1.input('AuthLvl',sql.Int)
          ps1.prepare('insert into Authentication values' +
                      '(@EmailId,@S_key,@AuthLvl)',
                    function(err){
                      ps1.execute({S_key:key,EmailId:body.Email,AuthLvl:AuthLevel}, function(err,recordset,rowcount){
                        if(err != null){
                          console.log(err + '456');
                        }
                        else{
                          callback(rowcount);
                        }
                      })
                    });
            }
