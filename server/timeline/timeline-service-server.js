var app = require("../../express");
var timelineModel = require("./timeline-model");

app.get('/api/timeline/po/:number', findByPO);
app.get("/api/timeline/req/:number", findByREQ);

function findByPO(request, res){
    console.log("Timeline: finding by PO " + request.params.number);
    timelineModel
    .findByPO(request.params.number)
    .then(function(val){
        res.json(val);
    })
}

function findByREQ(request, res){
    console.log("Timeline: finding by Req " + request.params.number);
    timelineModel
    .findByREQ(request.params.number)
    .then(function(val){
        res.json(val);
    })
}