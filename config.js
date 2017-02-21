var sql = require('tedious').connection;
var config = require('./config.js');


exports.dbConfig = function() {
return {
  server: 'recruitmentserver.database.windows.net',
  userName: 'ran',
  password: 'D1TDB@Hire',
  options: {
	  encrypt: true,
	  database: 'recruitmentDB'
  }
};
}

exports.port = function() {
  return 3000;
}
exports.SendGrigKey = function(){
  return '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';
}
