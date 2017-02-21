var winston = require('winston');

exports.error = function(err){

var logger = new (winston.Logger)({
  transports: [
    new(winston.transports.File)({ filename: 'servicelog.txt'})
  ]
});

if(err)
logger.error(err);
}

exports.info = function(info){

var logger = new (winston.Logger)({
  transports: [
    new(winston.transports.File)({ filename: 'servicelog.txt'})
  ]
});

if(info)
logger.info(info);
}
