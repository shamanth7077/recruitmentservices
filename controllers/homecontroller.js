var skill = require('../services/skill');

module.exports = function(app,recruitmentrouter){
  recruitmentrouter.get('/home', function (req,res){
    skill.getSkill(function(recordset){
      res.json(recordset);
    });
  });
  recruitmentrouter.get('/unit',function(req,res){
    res.status(200).json('Your our now connected to the server.')
  });
}
