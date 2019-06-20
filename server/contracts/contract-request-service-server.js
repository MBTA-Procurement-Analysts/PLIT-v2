var app = require('../../express');
var contractRequestModel = require('./contract.request.model.server');
app.post("/api/contract/request", createRequest);
app.get('/api/contract/requests', getRequests);
app.get('/api/contract/request/:rId', getSpecificRequest);
app.put('/api/contract/update-request/:rId', updateRequest);
app.delete('/api/contract/remove-request/:rId', removeRequest);

function createRequest(req, res) {
    var request = req.body;
    console.log(request);
    contractRequestModel
        .createRequest(request)
        .then(function (request) {
            res.send(request);
        }, function (err) {
            res.send(err);
        });

}

function updateRequest(req, res) {
    var request = req.body;
    contractRequestModel
        .updateRequest(request, req.params.rId)
        .then(function (request) {
            res.send(request);
        }, function (err) {
            console.log("error");
            res.send(err);
        });
}

function getRequests(req, res) {
    contractRequestModel
        .getRequests()
        .then(function (requests) {
            res.send(requests);
        }, function (err) {
            res.send(err);
        });
}

function getSpecificRequest(req, res) {
    contractRequestModel
        .getSpecificRequest(req.params.rId)
        .then(function (request) {
            res.send(request);
        }, function (err) {
            res.send(err);
        });
}

function removeRequest(req, res) {
    contractRequestModel
        .removeRequest(req.params.rId)
        .then(function (request) {
            res.send(request);
        }, function (err) {
            res.send(err);
        });
}
