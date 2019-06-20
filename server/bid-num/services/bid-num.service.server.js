var app = require('../../../express');
var bidNumModel = require('../model/bid-num.model.server');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth:{
            user: 'mbtatestnathan@gmail.com',
            pass: 'ColumbusOH2018'
        }}));
var mailOptions = {
    from: 'mbtatestnathan@gmail.com',
    to: 'noldakowski@mbta.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
app.post('/api/bid-num/request', requestBid);

function requestBid(req, res) {
    var bid = req.body;
    console.log(bid);
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    bidNumModel
        .requestBid(bid)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}