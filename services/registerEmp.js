var sql = require('mssql');
var config = require('../config.js');

exports.getEmployeeRegistered = function(emailId,callback){

      var ps = new sql.PreparedStatement();
      ps.input('email',sql.VarChar)
      ps.prepare('select Email from UserList where Email = @email',
                  function(err){
                    ps.execute({email: emailId},
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
    exports.registerEmployee = function(body,key,callback){
        console.log(body);
          var ps = new sql.PreparedStatement();
          ps.input('Name',sql.NVarChar)
          ps.input('Email',sql.NVarChar)
          ps.input('Skill',sql.NVarChar)
          ps.input('Role',sql.NVarChar)
          ps.prepare('insert into UserList values'+' (@Name,@Email,@Skill,@Role)',
                      function(err){
                        ps.execute({Name:body.Name,Email:body.Email,
                                    Skill:body.Skill,
                                    Role:body.Role},
                                function(err,recordset,rowcount){
                                  ps.unprepare(function(err) {

                                  });
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
          ps1.input('pw',sql.VarChar)
          ps1.input('EmailId',sql.VarChar)
          ps1.input('AuthLvl',sql.Int)

          ps1.prepare('insert into Authentication values' +
                      '(@EmailId,@pw,@AuthLvl)',
                    function(err){
                      ps1.execute({pw:key,EmailId:body.Email,AuthLvl:AuthLevel}, function(err,recordset,rowcount){
                        if(err != null){
                          ps1.unprepare(function(err) {

                          });
                          console.log(err + '456');
                        }
                        else{
                          callback(rowcount);
                        }
                      })
                    });
            }
