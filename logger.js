var winston = require('winston');
var moment = require('moment');

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
  var date = new Date();
  date = moment(date).format("YYYY-MM-DD");
var logger = new (winston.Logger)({
  transports: [
    new(winston.transports.File)({ filename: date+'.txt'})
  ]
});

if(info)
logger.info(info);
}
