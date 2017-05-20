var twilio = require('twilio');

var accountSid = process.env.TWILIO_ACCOUNT_SID || require('./config/config.js').TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN || require('./config/config.js').TWILIO_AUTH_TOKEN;

var client = new twilio(accountSid, authToken);

var sendMessage = function(phoneNumber, message) {
  client.messages.create({
    body: message,
    to: phoneNumber,
    from: '+15103423150'
  })
  .then((message) => {
    console.log(message.sid);
  });
}

module.exports.sendMessage = sendMessage;
