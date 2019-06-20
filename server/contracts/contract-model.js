var mongoose = require('mongoose');
var contractSchema = require('./contract-schema');
var contractModel = mongoose.model('ContractModel', contractSchema);
contractModel.getAllContracts = getAllContracts;

contractModel.hide = hide;
contractModel.unHide = unHide;
module.exports = contractModel;

function getAllContracts() {
    return contractModel.find();
}

function hide(cID){
    return contractModel.update({"_id": cID}, {
        '$set': {
            "hidden": true
        }})
}

function unHide(cID){
    return contractModel.update({"_id": cID}, {
        '$set': {
            "hidden": false
        }})
}