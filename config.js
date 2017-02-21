var sql = require('mssql');
var config = require('./config.js');

exports.dbConfig = function() {
return {
  server: 'tcp:recruitmentserver.database.windows.net',
  database: 'recruitmentDB',
  user: 'ran',
  password: 'D1TDB@Hire',
  options: {
        encrypt: true
    }

};
}

exports.port = function() {
  return 3000;
}
