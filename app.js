var express = require('express');
var sql = require('mssql');
var config = require('./config.js');
var routers = require('./routes.js');
var logger = require('./logger.js');


var app = express();


sql.connect(config.dbConfig(),function (err){
  logger.error(err);
  console.log(err);
})

routers.getRoutes(app);

var port = process.env.PORT || config.port();

app.listen(port);
console.log("recruitment portal is Live @port: %s", port);
