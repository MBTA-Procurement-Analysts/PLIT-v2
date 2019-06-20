var mongoose = require("mongoose");
var poSchema = require("./po-schema");
var poModel = mongoose.model('POModel',poSchema);

poModel.findPO = findPO;
poModel.findPA = findPA;

module.exports = poModel;

function findPO(poNumber){
    console.log("NO: " + poNumber);
    return poModel.find({"PO_No": poNumber});
}

function findPA() {
  console.log("finding PO's that are not x,c,a,or px");
  return poModel.find({Status: {$nin: ["C","X","D","PX","A"]}});
}

