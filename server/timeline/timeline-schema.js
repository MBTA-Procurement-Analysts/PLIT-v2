var mongoose = require("mongoose")
var timelineSchema = new mongoose.Schema({
    "Req_No": String,
    "PO_No": String,
    "Business_Unit": String,
    "Complicated": String,
    "Footnote": String,
    "events": [{
        "ID": String,
        "Start_DTTM": Date,
        "EventType": String,
        "Text": String,
        "Person": String,
        "Internal": Boolean,
        "Neutral": Boolean,
        "Auto": Boolean,
        "Lifecycle": String,
        "End_DTTM": Date
    }]
}, {"collection": "TIMELINE"});

module.exports = timelineSchema;