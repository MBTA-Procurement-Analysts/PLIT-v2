var app = require('../../express');
var tagModel = require("./tag-model");



app.get('/api/tag/:contentID', getTagsForContentID);

function getTagsForContentID(req,res){
    tagModel
        .getTagsForContent(req.params.contentID)
        .then(function(val){
            res.json(val);
        }, function(err){
            res.send(err);
        })
}

