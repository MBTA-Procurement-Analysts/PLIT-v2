var mongoose = require("mongoose");
var tagSchema = new mongoose.Schema(
    {
        "content_id": String,
        "User_Notes": [{
            "User": String,
            "Date": Number,
            "Note_Info": String
        }],
        "flag": Boolean,
        "hidden": Boolean
    }
    , {"collection": "TAG_DATA"});

module.exports = tagSchema;
