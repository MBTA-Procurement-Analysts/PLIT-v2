var mongoose = require("mongoose");

// Used Epoch Time float as timestamp to avoid timezone issues
var luSchema = new mongoose.Schema(
    { "dbname": String,
      "last_updated_time": Number}
    , {"collection": "LAST_UPDATED"});

module.exports = luSchema;
