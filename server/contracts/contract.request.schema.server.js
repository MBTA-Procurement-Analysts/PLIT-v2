var mongoose = require('mongoose');

var contractRequestSchema = mongoose.Schema({
        "Requesting_User": {
            "username": String,
            "fullname": String,
            "email": String
        },
        "Vendor_Name": String,
        "Requested_Dttm": Date,
        "Status": String,
        "Contract_ID" : String

    },
    {
        collection: "CONTRACT_NUMBER_REQUESTS"
    }
    )
;

module.exports = contractRequestSchema;
