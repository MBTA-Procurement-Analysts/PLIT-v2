var mongoose = require("mongoose");
var luSchema = require("./last_updated-schema");
var luModel = mongoose.model('LUModel',luSchema);
luModel.findLU = findLU;
module.exports = luModel;

function findLU(dbname){
    console.log("Last Updated API Called on: " + dbname);
    return luModel.find({"dbname": dbname});
}

