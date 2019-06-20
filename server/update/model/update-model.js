var mongoose = require("mongoose");
var updateSchema = require("./update-schema");
var updateModel = mongoose.model('UpdateModel',updateSchema);
updateModel.getLastDashboard = getLastDashboard;
module.exports = updateModel;

function getLastDashboard(){
    return updateModel.findOne({"dbname": "DASHBOARD_DATA"})
}