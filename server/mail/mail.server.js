var nodemailer = require('nodemailer');
console.log('in mail');
nodemailer.createTestAccount(function (err, account) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'localhost',
        tls: {rejectUnauthorized: false},
        auth: {
            user: "nathan@test.com",
            pass: "nathan"
        }
    });

// Message object
    var message = {
        // Comma separated list of recipients
        to: 'noldakowski@mbta.com',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html:
        '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>'
    };

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

// only needed when using pooled connections
        transporter.close();
    });
});