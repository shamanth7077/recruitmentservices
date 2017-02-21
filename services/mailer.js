 var helper = require('sendgrid').mail;
 var config = require('../config.js');

  module.exports = function(Email, Password,User,Name){
         var from_email = new helper.Email('DoNotReply@danskeit.co.in');
         var to_email = new helper.Email(Email);

         switch(User){
           case 'C':
             var subject = 'Login credentials for DIT test portal';
             var content = new helper.Content('text/html','<p>Dear '+Name+',</p><br/><div><p>You have successfully registered for the' +
             ' test</p><p>Please <a href="http://dbrecruitmentapp.azurewebsites.net/">click here</a> and login with the'+
             ' credentials mentioned below:</p><p>Username: <b>'+Email+
             '</b></p><p>Password: <b>'+Password+'</b></p></div>'+
              '<br/><br/><p><b>Note:-</b>This is an auto genereted mail, please do not reply.</p><p>Kind Regards,<br/> TBIT Recruitment</p>');
             break;
             case 'E':
               var subject = 'Login credentials for recruitment portal';
               var content = new helper.Content('text/html','<p>Dear '+Name+',</p><br/><div><p>You have successfully registered as an' +
               ' evaluator</p><p>Please <a href="http://dbrecruitmentapp.azurewebsites.net/">click here</a> and login with the'+
               ' credentials mentioned below to start evaluation:</p><p>Username: <b>'+Email+
               '</b></p><p>Password: <b>'+Password+'</b></p></div>'+
                '<br/><br/><p><b>Note:-</b>This is an auto genereted mail, please do not reply.</p><p>Kind Regards,<br/> TBIT Recruitment</p>');
               break;
        }

         var mail = new helper.Mail(from_email, subject, to_email, content);

         var sg = require('sendgrid')(config.SendGrigKey()); // Put this key in a config file
         var request = sg.emptyRequest({
                         method: 'POST',
                         path: '/v3/mail/send',
                         body: mail.toJSON()
         });

         sg.API(request, function(err, resp){
                         logger.error(err);
                         logger.info(resp.statusCode);
                         logger.info(resp.body);
                         logger.info(resp.headers);
         });
}
