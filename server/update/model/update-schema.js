var mongoose = require('mongoose');

var updateSchema = mongoose.Schema({
    "last_updated_time" : Number,
    "dbname" : String
}, {collection: "LAST_UPDATED"});

module.exports = updateSchema;