var mongoose = require("mongoose");
var timelineSchema = require("./timeline-schema");
var timelineModel = mongoose.model("TimelineModel", timelineSchema);

timelineModel.findByPO = findByPO;
timelineModel.findByREQ = findByREQ;

module.exports = timelineModel;

function findByPO(poNum, bunit){
    return timelineModel.find({"PO_No": poNum, "Business_Unit": bunit})
}

function findByREQ(reqNum, bunit){
    return timelineModel.find({"REQ_No": reqNum, "Business_Unit": bunit})
}