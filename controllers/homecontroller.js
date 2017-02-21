var skill = require('../services/skill');
var logger = require('../logger.js');
var fs = require('fs');
var bodyParser = require('body-parser');

module.exports = function(app,recruitmentrouter){
  recruitmentrouter.get('/home', function (req,res){
    skill.getSkill(function(recordset,err){
      if(err)
      {
        logger(err);
        res.status(500).json(err);
      }
      else {
        res.status(200).json(recordset);
      }
    });
  });
  recruitmentrouter.get('/unit',function(req,res){
    res.status(200).json('Your our now connected to the server.')
  });
  recruitmentrouter.get('/logs',function(req,res){
    fs.readFile("./servicelog.txt","utf8",function(err,data){
      if(err){
        console.log(err);
      }
      console.log(data);
      res.status(200).send(data);
    });
  });
  recruitmentrouter.post('/logger',function(req,res){
    logger.error(req.body);
    res.status(200).send('logged');
  })
}
