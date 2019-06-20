var app = require('../../../express');
var bidCountModel = require('../model/bid-num.model.server');
app.post('/api/bid-num/next', getCounter);
app.post('/api/bid-num/set', setCounter);

function getCounter(req, res) {
    bidCountModel
        .getCounter()
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}
function setCounter(req, res) {
    bidCountModel
        .setCounter(num)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}