var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
        "Count": Number
    },
    {
        collection: "count"
    }
    )
;

module.exports = counterSchema;