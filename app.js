var express = require('express');
var sql = require('tedious').connection;
var config = require('./config.js');
var routers = require('./routes.js');
var logger = require('./logger.js');

var connection = new sql(config.dbConfig());

var app = express();


sql.on('connect',function (err){
  logger.error(err);
  console.log(err);
})

routers.getRoutes(app);

var port = process.env.PORT || config.port();

app.listen(port);
console.log("recruitment portal is Live @port: %s", port);
