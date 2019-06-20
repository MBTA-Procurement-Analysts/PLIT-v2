var app = require('../../express');
//app.post('/api/save-fields', saveFields);
app.post('/api/generate-doc', generateWordDocument);
//app.get('/api/get-fields', getFields);
var JSZip = require('jszip');
var docxtemplater = require('docxtemplater');
var fs = require('fs');
function generateWordDocument(req,res) {
    var wordTemplate = fs.readFileSync('./data-files/IFB_Template.docx');
    var zip = new JSZip(wordTemplate);
    var document = new docxtemplater();
    document.loadZip(zip);
    console.log(req.body);
    document.setData(req.body);
    try {
        document.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
        };
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = document.getZip()
        .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync('public/gen_bid_docs/' + req.body.Bid_ID + '.docx', buf);
}