var mongoose = require('mongoose');
var contractRequestSchema = require('./contract.request.schema.server');
var contractRequestModel = mongoose.model('contractRequestModel', contractRequestSchema);

contractRequestModel.createRequest = createRequest;
contractRequestModel.getRequests = getRequests;
contractRequestModel.getSpecificRequest = getSpecificRequest;
contractRequestModel.updateRequest = updateRequest;
contractRequestModel.removeRequest = removeRequest;
module.exports = contractRequestModel;

function createRequest(request) {
    console.log("server" + JSON.stringify(request));

    return contractRequestModel.create(request);
}

function getRequests() {
    return contractRequestModel.find();
}

function getSpecificRequest(requestId) {
    return contractRequestModel.find({"_id": requestId});
}

function updateRequest(request, requestId) {
    console.log(requestId);
    console.log("UPDATING " + JSON.stringify(request))
    return contractRequestModel.updateOne({"_id": requestId}, {$set: request});
}
function removeRequest(requestId) {
    return contractRequestModel.remove({"_id": requestId});
}
