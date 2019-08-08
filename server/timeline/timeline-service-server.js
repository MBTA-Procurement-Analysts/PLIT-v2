var app = require("../../express");
var timelineModel = require("./timeline-model");

app.get('/api/timeline/po/:number/:bunit', findByPO);
app.get("/api/timeline/req/:number/:bunit", findByREQ);

function findByPO(request, res){
    console.log("Timeline: finding by PO " + request.params.number);
    timelineModel
    .findByPO(request.params.number, request.params.bunit)
    .then(function(val){
        res.json(val);
    })
}

function findByREQ(request, res){
    console.log("Timeline: finding by Req " + request.params.number + " " + request.params.bunit);
    timelineModel
    .findByREQ(request.params.number, request.params.bunit)
    .then(function(val){
        res.json(val);
    })
}