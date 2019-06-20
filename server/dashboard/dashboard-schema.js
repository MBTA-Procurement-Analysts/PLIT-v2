var mongoose = require("mongoose");
var dashboardSchema = new mongoose.Schema({
    'Req_ID': String,
    'Business_Unit': String,
    'Buyer': String,
    'Hold_From_Further_Processing': String,
    'Hold_Status': String,
    'Sourcing': String,
    'Lines_Not_Sourced': String,
    'Out_To_Bid': String,
    'Transmitted': String,
    'Transmitted_Time': Date
},

{
    "collection"
:
    "DASHBOARD_DATA"
}
)
;

module.exports = dashboardSchema;