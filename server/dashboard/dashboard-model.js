var mongoose = require("mongoose");
var dashSchema = require("./dashboard-schema");
var dashboardModel = mongoose.model('DASHModel',dashSchema);
dashboardModel.findUserDash = findUserDash;

module.exports = dashboardModel;

function findUserDash(userID){
    return dashboardModel.find({"Buyer": userID});
}

