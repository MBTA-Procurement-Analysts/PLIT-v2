var mongoose = require("mongoose")
var timelineSchema = new mongoose.Schema({
    "Req_No": String,
    "PO_No": String,
    "events": [{
        "ID": String,
        "Start_DTTM": Date,
        "Text": String,
        "Internal": Boolean,
        "Neutral": Boolean,
        "Lifecycle": String,
        "End_DTTM": Date
    }]
}, {"collection": "TIMELINE"});

module.exports = timelineSchema;