var mongoose = require("mongoose");
var timelineSchema = require("./timeline-schema");
var timelineModel = mongoose.model("TimelineModel", timelineSchema);

timelineModel.findByPO = findByPO;
timelineModel.findByREQ = findByREQ;

module.exports = timelineModel;

function findByPO(poNum){
    return timelineModel.find({"PO_No": poNum})
}

function findByREQ(reqNum){
    return timelineModel.find({"REQ_No": reqNum})
}