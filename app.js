var express = require('express');
var sql = require('mssql');
var config = require('./config.js');
var routers = require('./routes.js');
var logger = require('./logger.js');


var app = express();

logger.info('Inside App'+config.dbConfig());

sql.connect(config.dbConfig()).then(function(){
	logger.info('Connection Success!!');
}).catch(function(err){
	logger.info('Error in connection'+err);
})

routers.getRoutes(app);

var port = process.env.PORT || config.port();

app.listen(port);
console.log("recruitment portal is Live @port: %s", port);
