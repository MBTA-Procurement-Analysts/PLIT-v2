var app = require('./express'); // creates an instance of the express lib
var express = app.express;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({secret: "this is secret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

require("./app.js");
var release = process.argv[2]
var port = release == 'prod' ? 3000 : 8005;
console.log(port)
app.listen(port);
