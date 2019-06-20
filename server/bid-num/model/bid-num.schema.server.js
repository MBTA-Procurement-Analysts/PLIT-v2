var mongoose = require('mongoose');

var bidNumSchema = mongoose.Schema({
        "BuyerID": String,
        "Proj_Name": String,
        "Req_ID": String,
        "Fund_Code": String,
        "Fund_Src": String,
        "Timeframe": String,
        "Comments": String,
        "Requested_Dttm": Date
    },
    {
        collection: "bidNumber"
    }
    )
;

module.exports = bidNumSchema;