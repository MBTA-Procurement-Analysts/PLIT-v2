var mongoose = require("mongoose");
var tagSchema = require("./tag-schema");
var tagModel = mongoose.model('TAGModel',tagSchema);

tagModel.getTagsForContent = getTagsForContent;
module.exports = tagModel;

function addNote(reqNumber, note){
    return tagModel.create({"content_id": reqNumber,
            "User_Notes": {
                "User": note.User,
                "Date": note.Date,
                "Note_Info": note.Note_Info
            }
})}
function addFlag(reqNumber){
    console.log(reqNumber);
    return tagModel.create({"content_id": reqNumber,
            "flag": true
        })
}

function unFlag(reqNumber){
    console.log(reqNumber);
    return tagModel.updateOne({"content_id": reqNumber}, {
        '$set': {
            "flag":null
        }})
}


function getTagsForContent(contentID){
    return tagModel.find({"content_id":contentID})
}