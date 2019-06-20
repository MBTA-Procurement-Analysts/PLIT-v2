var app = require('../../express');
var reqModel = require("./req-model");

app.get('/api/req/:number', findReq);
app.get('/api/req/buyer/:buyer/:date', getBuyerReqsForDate);
app.get('/api/req/date/:date', getReqsForDate);
app.post('/api/add-note/:reqId', addNote);
app.put('/api/req/addFlag/:reqId', addFlag);
app.put('/api/req/unFlag/:reqId', unFlag);

function addNote(req, res){
    reqModel
        .addNote(req.params.reqId, req.body)
        .then(function (val) {
            res.json(val);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}

function addFlag(req, res) {
    reqModel
        .addFlag(req.params.reqId)
        .then(function (val) {
            res.json(val);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}

function unFlag(req, res) {
    reqModel
        .unFlag(req.params.reqId)
        .then(function (val) {
            res.json(val);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}
function getBuyerReqsForDate(req,res){
    console.log(req.params.date);
    reqModel
        .getBuyerReqsForDate(req.params.buyer,req.params.date)
        .then(function(response){
            console.log(response);
            res.json(response);
        })
}
function getReqsForDate(req,res){
    reqModel
        .getReqsForDate(req.params.date)
        .then(function(response){
            console.log(response);
            res.json(response);
        })
}
function findReq(req,res){
    reqModel
        .findReq(req.params.number)
        .then(function(val){
            res.json(val);
        })
}