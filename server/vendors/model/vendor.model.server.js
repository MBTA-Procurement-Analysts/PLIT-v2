var mongoose = require('mongoose');
var vendorSchema = require('./vendor.schema.server');
var vendorModel = mongoose.model('vendorModel', vendorSchema);

vendorModel.createVendor = createVendor;
vendorModel.getVendors = getVendors;
vendorModel.getSpecificVendor = getSpecificVendor;
vendorModel.updateVendor = updateVendor;
vendorModel.removeVendor = removeVendor;
module.exports = vendorModel;

function createVendor(vendor) {
    return vendorModel.create(vendor);
}

function getVendors() {
    return vendorModel.find();
}

function getSpecificVendor(vendorId) {
    return vendorModel.find({"_id": vendorId});
}

function updateVendor(vendor, vendorId) {
    return vendorModel.update({_id: vendorId}, {$set: vendor});
}
function removeVendor(vendorId) {
    return vendorModel.remove({_id: vendorId});
}
