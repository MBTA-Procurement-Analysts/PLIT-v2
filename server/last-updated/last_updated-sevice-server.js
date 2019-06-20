var app = require('../../express');
var luModel= require("./last_updated-model");

app.get('/api/lu/:dbname', findLU);

function findLU(req, res) {
    luModel
           .findLU(req.params.dbname)
           .then(function(val) {
            res.json(val)
           })
}


