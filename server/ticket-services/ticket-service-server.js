var app = require('../../express');
var ticketModel = require('./ticket-model');
app.post('/api/addTicket', addTicket);
app.get('/api/getTickets', getTickets)

function addTicket(req, res) {
  var ticket = req.body;
  console.log("creating ticket");

  ticketModel
  .addTicket(ticket)
  .then(function (ticket) {
    res.send(ticket);
  }, function (err) {
    res.send(err);
  });
}

function getTickets(req, res) {
  ticketModel
  .getTickets()
  .then(function (tickets) {
    res.send(tickets);
  }, function (err) {
    res.send(err);
  })
}
