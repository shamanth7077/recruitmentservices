var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateRegistered = function(emailId,callback){
      var ps = new sql.PreparedStatement();
      ps.input('email',sql.VarChar)
      ps.prepare('select Email from Candidate where Email = @email',
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
    exports.registerCandidate = function(body,key,Id,date,callback){
          var ps = new sql.PreparedStatement();

          ps.input('ID',sql.Int)
          ps.input('Name',sql.NVarChar)
          ps.input('Email',sql.NVarChar)
          ps.input('Phone',sql.NVarChar)
          ps.input('Experience',sql.Numeric(5,2))
          ps.input('Skill',sql.NVarChar)
          ps.input('Registration_Date',sql.NVarChar)
          ps.input('Consultant_Name',sql.NVarChar)
          ps.input('Score',sql.Numeric(5,2))
          ps.input('Status',sql.NVarChar)
          ps.input('Resume',sql.NVarChar)
          ps.input('lscore',sql.Numeric(5,2))
          ps.prepare('insert into Candidate values'+
          '(@ID,@Name,@Email,@Phone,@Experience,@Skill,@Registration_Date,@Consultant_Name,@Score,@lscore,@Status,@Resume)',
                      function(err){
                        ps.execute({ID:Id,Name:body.Name,Email:body.Email,
                                    Phone:body.Phone,
                                    Experience:body.Experience,Skill:body.Skill,
                                    Registration_Date:date,
                                    Consultant_Name:body.Consultant_Name,
                                    Score:null,lscore:null,Status:1,
                                    Resume:body.Email},
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

        exports.generateAuth = function(body,key,callback){
          var ps1 = new sql.PreparedStatement();
          ps1.input('S_key',sql.VarChar)
          ps1.input('EmailId',sql.VarChar)
          ps1.input('AuthLvl',sql.Int)
          
          ps1.prepare('insert into Authentication values' +
                      '(@EmailId,@S_key,@AuthLvl)',
                    function(err){
                      ps1.execute({S_key:key,EmailId:body.Email,AuthLvl:10}, function(err,recordset,rowcount){
                        ps1.unprepare(function(err) {

                        });
                        if(err != null){
                          console.log(err + '456');
                        }
                        else{
                          callback(rowcount);
                        }
                      })
                    });
            }
