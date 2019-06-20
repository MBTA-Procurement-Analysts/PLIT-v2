var mongoose = require('mongoose');

var contractSchema = mongoose.Schema({

        'Contract_ID': String,
        'Expire_Date': Date,
        'Max_Amt': Number,
        'Vendor_ID': String,
    'hidden': Boolean,
        "Vendor_Name": String,
        "lines": [{
            "Line_No": Number,
            "Description": String
        }]
    },
    {
        collection: "CONTRACT_DATA"
    }
    )
;

module.exports = contractSchema;