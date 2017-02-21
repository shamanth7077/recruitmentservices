var sql = require('mssql');
var config = require('./config.js');


exports.dbConfig = function() {
return {
  server: 'recruitmentserver.database.windows.net,1433',
  database: 'recruitmentDB',
  user: 'ran@recruitmentserver',
  password: 'D1TDB@Hire',
  options: {
	  encrypt: true
  }
};
}

exports.port = function() {
  return 3000;
}
exports.SendGrigKey = function(){
  return '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';
}
