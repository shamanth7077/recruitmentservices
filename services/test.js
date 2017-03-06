var sql = require('mssql');
var config = require('../config.js');
var logger = require('../logger');

exports.Validate = function(id,callback){
var ps = new sql.PreparedStatement();
ps.input('email',sql.VarChar)
ps.prepare('select Email, Password from Authentication where Email = @email',
            function(err){
              ps.execute({email: id},
                      function(err,recordset){
                        ps.unprepare(function(err) {

                        });
                        if(err != null){
                          logger.info('Validate: ' + err);
                        }
                        else {
                          var ps1 = new sql.PreparedStatement();
                          ps1.input('email',sql.VarChar)
                          ps1.prepare('select Email,Experience,Skill,Status from Candidate where Email = @email',function(err){
                            ps1.execute({email: id}, function(err,rec1){
                              ps1.unprepare(function(err) {

                              });
                              if(err != null){
                                console.log(err.message + ' Validate');
                              }
                              else{
                                callback(recordset,rec1);
                              }
                            })
                          });
                        }
                      })
            });
}

exports.GetLevel = function(inRec,callback){
  var ps = new sql.PreparedStatement();
  console.log(inRec);
  ps.input('Exp', sql.Decimal(5,2))
  ps.prepare('select ID,Experience from Experience'+
          ' where Experience <= @Exp',
                    function(err){
                      ps.execute({Exp:inRec.Experience},
                          function(err,outRec){
                            ps.unprepare(function(err) {

                            });
                            if(err != null){
                              console.log(err.message + ' @Exp');
                            }
                            else {
                              console.log(outRec);
                              callback(outRec);
                            }
                          })
                    });
}

exports.GetQuestionSet = function(rec1,inRec,callback){
  logger.info('Input for GetQuestion: ' + rec1.Skill + 'Level:' + inRec);
  var ps = new sql.PreparedStatement();
  ps.input('skill', sql.VarChar)
  ps.input('level', sql.Int)
  ps.prepare('Select ID,Questions from Question Where Level = @level and Skill = @skill',
              function(err){
                ps.execute({skill:rec1.Skill,level:inRec},
                  function(err,finalrecord){
                    ps.unprepare(function(err) {

                    });
                    if(err != null){
                      console.log(err.message + 'Final');
                    }
                    else {
                      callback(finalrecord);
                    }
                  })
              });
}
exports.removePassword = function(id,callback){
  var ps2 =  new sql.PreparedStatement();
  ps2.input('email',sql.VarChar)
  ps2.input('pswrd',sql.VarChar)
  ps2.prepare('Update Authentication Set Password = @pswrd where Email = @email', function(err){
    ps2.execute({pswrd:null,email:id}, function(err,rec,update){
      ps2.unprepare(function(err) {

      });
      if(err != null){
        console.log(err +'Update');
      }
      else{
        callback(update);
      }
    })
  })
}
