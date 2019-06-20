var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
        bidId: {type: mongoose.Schema.ObjectId, ref: "bidModel"},
        fileName: String,
        file: Buffer
    },
    {
        collection: "files"
    }
    )
;

module.exports = fileSchema;