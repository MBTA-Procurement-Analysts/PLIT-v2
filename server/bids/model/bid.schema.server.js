var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
        "Buyer": {
            "username": String,
            "fullname": String,
            "email": String
        },
        "Proj_Name": String,
        "Req_ID": String,
        "Fund_Code": String,
        "Bid_Type": String,
        "Timeframe": Date,
        "Comments": String,
        "Requested_Dttm": Date,
        "Bid_ID": String,
        "minimumAcceptanceDays": Number,
        "performanceBond": Boolean,
        "Proj_Descr": String,
        "preBidConference": Boolean,
        "PreBidDttm": Date,
        "alternativebid": Boolean,
        "deliveryAddress": String,
        "deliveryTime": String,
        "performanceGuaranteePercent": Number,
        "performanceGuaranteeAmount": String,
        "liquidatedDamages": Boolean,
        "liquidatedDamagesConditions": String,
        "liquidatedDamagesAmtPer": Number,
        "liquidatedDamagesUOD": Number,
        "maxLiquidatedDamages": Number,
        "securityReqs": Boolean,
        "row": Boolean,
        "comments": String

    },
    {
        collection: "bid"
    }
    )
;

module.exports = bidSchema;
