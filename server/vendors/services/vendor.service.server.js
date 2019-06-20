var app = require('../../../express');
var vendorModel = require('../model/vendor.model.server');

app.post('/api/add-vendor', createVendor);
app.get('/api/vendors', getVendors);
app.get('/api/vendor/:vendorId', getSpecificVendor);
app.put('/api/update-vendor/:vendorId', updateVendor);
app.delete('/api/remove-vendor/:vendorId', removeVendor);

function createVendor(req, res) {
    var vendor = req.body;
    console.log(vendor);
    vendorModel
        .createVendor(vendor)
        .then(function (vendor) {
            res.send(vendor);
        }, function (err) {
            res.send(err);
        });
}

function updateVendor(req, res) {
    var vendor = req.body;
    console.log(vendor);
    vendorModel
        .updateVendor(vendor, req.params.vendorId)
        .then(function (vendor) {
            res.send(vendor);
        }, function (err) {
            res.send(err);
        });
}

function getVendors(req, res) {
    vendorModel
        .getVendors()
        .then(function (vendors) {
            res.send(vendors);
        }, function (err) {
            res.send(err);
        });
}

function getSpecificVendor(req, res) {
    vendorModel
        .getSpecificVendor(req.params.vendorId)
        .then(function (vendor) {
            res.send(vendor);
        }, function (err) {
            res.send(err);
        });
}

function removeVendor(req, res) {
    vendorModel
        .removeVendor(req.params.vendorId)
        .then(function (vendor) {
            res.send(vendor);
        }, function (err) {
            res.send(err);
        });
}

