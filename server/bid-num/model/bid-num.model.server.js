var mongoose = require('mongoose');
var bidNumSchema = require('./bid-num.schema.server');
var bidNumModel = mongoose.model('BidNumModel', bidNumSchema);

bidNumModel.requestBid = requestBid;
module.exports = bidNumModel;

function requestBid(bid) {
    console.log(bid);
    return bidNumModel.create(bid);
}

