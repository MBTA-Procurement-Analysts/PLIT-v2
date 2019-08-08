var mongoose = require("mongoose");
var ticketSchema = require("./ticket-schema");
var ticketModel = mongoose.model('TICKETModel', ticketSchema);
ticketModel.addTicket = addTicket;
ticketModel.getTickets = getTickets;
module.exports = ticketModel;

function addTicket(ticket) {
  console.log("server" + JSON.stringify(ticket));
  return ticketModel.create(ticket);
}

function getTickets() {
  return ticketModel.find();
}
