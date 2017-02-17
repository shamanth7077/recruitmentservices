var sql = require('mssql');
var config = require('../config.js');

exports.getCandidateId = function(id,pw,callback){
    var ps = new sql.PreparedStatement();
    ps.input('email',sql.VarChar)
    ps.prepare('select ID from Candidate where Email = @email', function(err){
      ps.execute({email:id}, function(err,recordset){
        if(err != null){
          console.log(err.message + 'Select');
        }
        else{
          if(recordset[0].ID == null){
            callback({Status:"Candidate not found"});
          }
          else{
            var ps3 = new sql.PreparedStatement();
            ps3.input('email',sql.VarChar)
            ps3.prepare('select Email,Password from Authentication where Email = @email', function(err){
              ps3.execute({email:id}, function(err,recordset1){
                if(err != null){
                  console.log(err.message + 'Select2');
                }
                else{
                  if(recordset1[0].Password == null){
                    callback({Status:"Candidate not found"});
                  }
                  else{
                    callback(recordset,recordset1);
                  }
                }
          });
        });
      }
    }
      })
    });
}
exports.submitAnswer = function(Answers,recordset){
    var result = '';
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
      console.log(Answers.Question_Id,recordset[0].ID,Answers.Answer,Answers.Question);
      ps.execute({q:Answers.Question,q_id:Answers.Question_Id,cid:recordset[0].ID,ans:Answers.Answer,stat:null}, function(err,recordset,rowcount){

        if(err){
          console.log(err);
        }
        else{
            result = rowcount;
        }
        ps.unprepare(function(err) {
          if(err){
            console.log(err);
          }
        });
      })
    });
    return result;
}

exports.done = function(recordset,id,callback){
  var ps1 = new sql.PreparedStatement();
  ps1.input('cid',sql.Int)
  ps1.input('testStat',sql.VarChar)

  ps1.prepare('Update Candidate Set Status = @testStat where ID=@cid', function(err){
    ps1.execute({cid:recordset[0].ID,testStat:2}, function(err,recordset,commit){
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
