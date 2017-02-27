var sql = require('mssql');
var config = require('../config.js');
var logger = require('../logger');



exports.getCandidateId = function(id,callback){
    var ps = new sql.PreparedStatement();
    ps.input('email',sql.VarChar)
    ps.prepare('select ID,Status from Candidate where Email = @email', function(err){
      ps.execute({email:id}, function(err,recordset){
        ps.unprepare(function(err) {

        });
        if(err != null){
          console.log(err.message + 'Select');
        }
        else{
          if(recordset[0].ID == null){
            callback({Status:"Candidate not found"});
          }
          else{
            callback(recordset);
          }
        }
      })
    });
}
exports.submitAnswer = function(Answers,recordset,callback){

    console.log(Answers);
    var ps = new sql.PreparedStatement();
    ps.input('q',sql.VarChar)
    ps.input('q_id',sql.Int)
    ps.input('cid',sql.Int)
    ps.input('ans',sql.VarChar)
    ps.input('stat',sql.VarChar)

    ps.prepare('Insert into Test values (@cid,@q_id,@q,@ans,@stat)',function(err){
      if(err){
        console.log(err);
      }
      console.log(Answers.ID,recordset[0].ID,Answers.Answer,Answers.Questions);
      ps.execute({q:Answers.Questions,q_id:Answers.ID,cid:recordset[0].ID,ans:Answers.Answer,stat:null}, function(err,recordset,rowcount){
        var result = 0;
        if(err){
          logger.error(err);
          console.log(err);
          result=0;
          callback(result);
        }
        else{
            result = rowcount; 
            callback(result);
        }
        ps.unprepare(function(err) {
          if(err){
            console.log(err);
          }
        });
      })
    });
}

exports.done = function(recordset,id,callback){
  var ps1 = new sql.PreparedStatement();
  ps1.input('cid',sql.Int)
  ps1.input('testStat',sql.VarChar)

  ps1.prepare('Update Candidate Set Status = @testStat where ID=@cid', function(err){
    ps1.execute({cid:recordset[0].ID,testStat:3}, function(err,recordset,commit){
      ps1.unprepare(function(err) {

      });
      if(err != null){
        console.log(err.msg+'Update');
      }
      else {
        if(commit !=0){
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
      }
    })
  });
}
