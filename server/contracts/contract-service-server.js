var app = require('../../express');
var contractModel = require("./contract-model");

app.get('/api/contract', getAllContracts);
app.put('/api/contract/hide/:cID', hide);
app.put('/api/contract/unhide/:cID', unHide);
function hide(req, res) {
    console.log(req.params.cID);
    contractModel
        .hide(req.params.cID)
        .then(function (val) {
            res.json(val);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}

function unHide(req, res) {
    contractModel
        .unHide(req.params.cID)
        .then(function (val) {
            res.json(val);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}
function getAllContracts(req, res) {
    contractModel
        .getAllContracts()
        .then(function (val) {
            res.json(val);
        })
}
