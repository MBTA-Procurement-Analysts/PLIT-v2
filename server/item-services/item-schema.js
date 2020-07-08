var mongoose = require("mongoose");
var itemSchema = new mongoose.Schema({
    "Item_No": String,
    "Item_Description": String,
    "Item_Group": { "Group_Number": Number, "Group_Description": String },
    "Status": String,
    "UOM": String,
    "Locations": [{
        "Unit": String, "Area": String,
        "Level 1": String, 
        "Level 2": String, 
        "Level 3": String, 
        "Level 4": String
    }],
    "Status_Date": Date,
    "Viable_Subs": [{
        "Mfg_ID": String,
        "Mfg_Item_ID": String
    }],
    "Warehouse_Information": [{
        "Unit" : String,
        "Status_Current" : String,
        "Util_Type" : String, 
        "Qty_On_Hand" : Number,
        "Qty_Available" : Number,
        "Reorder_Point" : Number,
        "Max_Qty" : Number,
        "Last_Month_Demand" : Number,
        "Last_Quarter_Demand" : Number,
        "Last_Annual_Demand" : Number,
        "Avg_Price" : Number,
        "Last_Putaway" : Date,
        "No_Replenish" : String,
        "Replenish_Class" : String,
        "Cost_Element" : Number,
        "Replenish_Lead" : Number 
    }]

}, {
        "collection": "ITEM_DATA"
    });

module.exports = itemSchema;