var app = require('../../express');
var dashModel = require("./dashboard-model");

app.get('/api/dashboard/:userID', findUserDash);

function findUserDash(req, res) {
    dashModel
        .findUserDash(req.params.userID)
        .then(function (val) {
            res.json(val);
        })
}
