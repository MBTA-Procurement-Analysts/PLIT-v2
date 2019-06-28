var mongoose = require("mongoose");
var poSchema = new mongoose.Schema({
    "PO_No" : String,
    "Approved_By": String,
    "Business_Unit": String,
    "Buyer":String,
    "Origin":String,
    "PO_Date": Date,
    "Status": String,
    "Vendor_Name": String,
    "lines": [{
        "Line_No": Number,
        "Mfg_Id":String,
        "Mfg_Itm_Id": String,
        "Quantity": Number,
        "Itm_No": String,
        "Amount": Number,
        "Taxo_Lvl_1": String,
        "Taxo_Lvl_2": String,
        "Quote_Link":String,
        "Description":String,
        "Requisition":{
            "Req_ID": String,
            "Line_No": Number
        }
    }],
  "worklist": [{
                      "Appr_Inst": Number,
                      "Work_List": String,
                      "Approval_Number": String,
                      "Appr_Stat": String,
                      "Denial_Date_Time": Date,
                      "User": String,
                      "Unit": String,
                      "PO_HDR_Status": String,
                      "WF_APPR_Status": String,
                      "Dispatch_DTTM": Date,
                      "Threshold": String,
                      "Buyer": String,
                      "PO_Hdr_Created_Date": Date,
                      "SUM_MERCHANDISE_AMT": Number,
  }]
},{"collection":"PO_DATA"});

module.exports = poSchema;
