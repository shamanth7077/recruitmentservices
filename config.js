var sql = require('mssql');
var config = require('./config.js');

exports.dbConfig = function() {
return {
  server: 'Y31247',
  database: 'Recruitment',
  user: 'TBIT_Recruitment',
  password: 'Recruitment_TBIT'
};
}

exports.port = function() {
  return 3000;
}
