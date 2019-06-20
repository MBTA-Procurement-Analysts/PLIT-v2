var mongoose = require('mongoose');
var fileSchema = require('./files.schema.server');
var fileModel = mongoose.model('FileModel', fileSchema);

fileModel.insertFile = insertFile;

function insertFile(fileObj) {
    console.log(fileObj);
    return fileModel.create(fileObj);
}

module.exports = fileModel;