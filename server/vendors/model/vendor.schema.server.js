var mongoose = require('mongoose');

var vendorSchema = mongoose.Schema({
        name: String,
        type: [String],
        entities: [String],
        website: String,
        grossSales: String,
        yearsInBusiness: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        email: String,
        phone: String,
        fax: String,
        contactName: String,
        active: Boolean,
        claimed: Boolean,
        description: String,
        users: [{type: mongoose.Schema.ObjectId, ref: "userModel"}]
    },
    {
        collection: "vendors"
    }
);

module.exports = vendorSchema;