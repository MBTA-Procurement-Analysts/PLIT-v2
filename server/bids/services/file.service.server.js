var app = require('../../../express');
var filesModel = require('../model/files.model.server');

app.post('/api/bid/file', uploadFile);

function uploadFile(req, res) {
    var file = req.body;
    console.log('file: ' + JSON.stringify(file));
    filesModel
        .insertFile(file)
        .then(function (file) {
            res.send(file);
        }, function (err) {
            res.send(err);
        });
}
