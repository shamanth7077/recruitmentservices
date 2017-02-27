var cleanup = require('../services/cleanup');
var logger = require('../logger.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

module.exports = function(app,cleanuprouter){
  cleanuprouter.get('/auth', function (req,res){
    cleanup.cleanAuth(function(recordset,err){
      if(err)
      {
        logger.error(err);
        res.status(500).json(err);
      }
      else {
        res.status(200).json(recordset);
      }
    });
  });
  cleanuprouter.get('/can',function(req,res){
    cleanup.cleanCan(function(recordset,err){
      if(err)
      {
        logger.error();(err);
        res.status(500).json(err);
      }
      else {
        res.status(200).json(recordset);
      }
    });
  });

  cleanuprouter.get('/emp',jsonParser,function(req,res){
    cleanup.cleanEmp(function(recordset,err){
      if(err)
      {
        logger.error(err);
        res.status(500).json(err);
      }
      else {
        res.status(200).json(recordset);
      }
    });
  })
}
