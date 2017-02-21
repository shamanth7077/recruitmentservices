var summary = require('../services/evalsummary');

module.exports = function(app,summaryrouter){
  summaryrouter.get('/summary', function (request,response){
    summary.getCandidateInfo(request.query,function(recordset){
      response.json(recordset);
    });
  });
}
