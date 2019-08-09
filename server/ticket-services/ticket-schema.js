var mongoose = require("mongoose");
var ticketSchema = new mongoose.Schema(
  {
    "Date_Submitted": Date,
    "Description": String,
    "Requester": String,
    "Priority": String,
    "Date_Needed": Date,
    "Comment": String,
    "Ticket_ID": Number
  }
  ,{"collection": "TICKETS"});

  module.exports = ticketSchema;
