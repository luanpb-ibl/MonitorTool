var nodemailer = require('nodemailer');

var smtpConfig = require('./config').smtpConfig;

var transporter = nodemailer.createTransport(smtpConfig);

function sendMail(_to, _subject, _content, cb) {

    // setup e-mail data with unicode symbols
    var mailOptions = {
        //from: smtpConfig.auth.user, // sender address
        from: smtpConfig.auth.name + ' <' + smtpConfig.auth.user + '>', // sender address
        to: _to, // list of receivers
        subject: _subject, // Subject line
        //html: _htmlBody // html body
        text: _content
    };
    console.log("mailOptions : ", mailOptions);
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return cb(error);
        }
        return cb(null, info);
    });
}

module.exports = sendMail;