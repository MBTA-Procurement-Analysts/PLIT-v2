var cron = require("node-cron");
var express = require('express');
var app = express();
cron.schedule("*/30 6-18 * * 1-5", function(){
    console.log(new Date);
    var trello = require('./trello/trello.service.server.js');
    trello.init();

});
console.log(process.argv)
cronport = process.argv[2] == 'prod' ? 3128 : 8128

app.listen(cronport);
