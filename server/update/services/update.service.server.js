var app = require('../../../express');
var updateModel = require("./../model/update-model");

app.get('/api/update/dashboard', getLastDashboard);

function getLastDashboard(req,res){
    updateModel
        .getLastDashboard()
        .then(function (val) {
            res.json(val);
        }, function (err) {
            res.send(err);
        });
}
