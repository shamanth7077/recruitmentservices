var sql = require('mssql');
var config = require('./config.js');


exports.dbConfig = function() {
return {
  server: 'recruitmentserver.database.windows.net',
  database: 'recruitmentDB',
  user: 'ran',
  password: 'D1TDB@Hire'
};
}

exports.port = function() {
  return 3000;
}
exports.SendGrigKey = function(){
  return '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';
}
