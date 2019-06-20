var mongoose = require("mongoose");
var reqSchema = require("./req-schema");
var reqModel = mongoose.model('REQModel',reqSchema);
reqModel.findReq = findReq;
reqModel.addNote = addNote;
reqModel.getBuyerReqsForDate = getBuyerReqsForDate;
reqModel.getReqsForDate = getReqsForDate;
reqModel.addFlag = addFlag;
reqModel.unFlag = unFlag;
module.exports = reqModel;

function findReq(reqNumber){
    console.log("NO: " + reqNumber);
    return reqModel.find({"REQ_No": reqNumber});
}

function addNote(reqNumber, note){
    console.log(reqNumber);
    console.log(note.User);
    console.log(note.Date);
    console.log(note.Note_Info);
    return reqModel.updateOne({"REQ_No": reqNumber}, {
        '$push': {
            "User_Notes": {
                "User": note.User,
                "Date": note.Date,
                "Note_Info": note.Note_Info
            }
        }})
}

function addFlag(reqNumber){
    console.log(reqNumber);
    return reqModel.updateOne({"REQ_No": reqNumber}, {
        '$set': {
            "flag": true
        }})
}

function unFlag(reqNumber){
    console.log(reqNumber);
    return reqModel.updateOne({"REQ_No": reqNumber}, {
        '$set': {
            "flag":null
        }})
}

function getBuyerReqsForDate(buyer, date){
    var utcDate = new Date(date)
    utcDate.setTime(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);
    console.log(buyer + " " + new Date(utcDate).toISOString());
    return reqModel.find({"Buyer": buyer, "Approved_On":  new Date(utcDate)});
}

function getReqsForDate(date){
    var utcDate = new Date(date)
    utcDate.setTime(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);
    console.log("!!" + new Date(utcDate).toISOString());
    return reqModel.find({"Approved_On":  new Date(utcDate)});
}
