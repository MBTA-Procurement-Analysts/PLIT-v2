var app = require('../../express');
var poModel = require("./po-model");

app.get('/api/po/:number', findPO);
app.get('/api/collection-list', getCollections);
app.get('/api/POPA', findPA);

function findPO(req,res){
    console.log("PO NUMBER: " + req.params.number);
    console.log('wow we made it');
        poModel
        .findPO(req.params.number)
        .then(function(val){
            console.log(val);
            res.json(val);
        })
}
function findPA(req, res) {
  console.log("finding PA service call made");
  poModel
    .findPA()
    .then(function(pos) {
      res.send(pos);
    }, function (err) {
      res.send(err);
    })
}

function getCollections(req,res){
    console.log(app.collections);
    return app.collections;
}

