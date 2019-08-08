console.log("SERVER SIDE!");
var app = require('express'); // creates an instance of the express lib
var mongoose = require('mongoose');
// var connectionString = 'mongodb://localhost/dev';
// release is either 'prod' or 'dev', based on the argument passed to npm during project init
var release = process.argv[2]
var connectionString = "mongodb://localhost/rubix-" + "local" + "-" + release
console.log(connectionString)
console.log(process.argv)
if (process.env.MLAB_USERNAME_WEBDEV) {
    console.log("on heroku!");
    connectionString = process.env.MLAB_USERNAME_WEBDEV + ":" +
        process.env.MLAB_PASSWORD_WEBDEV + "@ds135444.mlab.com:35444/heroku_829kjs4t"
}

if (process.env.MLAB_USERNAME) { // check if running remotely
    connectionString = process.env.MLAB_USERNAME_WEBDEV + ":" +
        process.env.MLAB_PASSWORD_WEBDEV + "@ds135444.mlab.com:35444/heroku_829kjs4t"
}
console.log("connecting with: " + connectionString);

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;
require("./server/user/services/user.service.server");
require("./server/bids/services/file.service.server");
require("./server/bids/services/bid.service.server");

require("./server/bids/services/bid.service.server");
require("./server/document_editor/document_editor.service.server");

require("./server/bids/services/file.service.server");
require("./server/vendors/services/vendor.service.server");
require("./server/bid-num/services/bid-num.service.server");
require("./server/update/services/update.service.server")
require("./server/item-services/item-service-server");
require("./server/po-services/po-service-server");
require("./server/req-services/req-service-server");
require("./server/dashboard/dashboard-service-server");
require("./server/trello/trello.service.server");
require("./server/contracts/contract-service-server");
require("./server/contracts/contract-request-service-server");
require("./server/last-updated/last_updated-sevice-server.js");
require("./server/ticket-services/ticket-service-server");

require("./server/tags/tag-service-server");

require("./server/cron-list");
//require("./server/mail/mail.server");

module.exports = app;
