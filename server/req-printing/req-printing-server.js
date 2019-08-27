var app = require('../../express')
var reqModel = require('../req-services/req-model')
var itemModel = require('../item-services/item-model')

app.get('/api/req-print/:buyer/:date', getPrintingObject);

// function wrangleReq(req) {
//     return new Promise(function (resolve, reject) {
//         try {
//             if (req['Ship_To']['Address_2'] == "NaN") {
//                 req['Ship_To']['Address_2'] = "";
//             }
//             resolve(req)
//         }
//         catch (err) {
//             reject(err)
//         }
//     })
// }

function wrangleReq(req) {
    let statusDict = {
        "A": "Approved",
        "C": "Completed",
        "P": "Pending",
        "X": "Cancelled"
    }
    try {
        // address line 2: remove NAs
        if (req['Ship_To']['Address_2'] == "NaN") {
            req['Ship_To']['Address_2'] = "";
        }
        // translate status
        req['Status'] = statusDict[req['Status']];
        // Calculates sum of req lines
        var linesSum = 0.0;
        for (item of req['lines']) {
            linesSum += item['Line_Total'];
            if (item['More_Info'].length > 100) {
                item['More_Info'] = item['More_Info'].substring(0, 65) + "...";
            }
        }
        req['Sum_Amount'] = linesSum;
        return req;
    }
    catch (err) {
        console.log(err);
        throw Error(err);
    }
}

function wrangleItem(item) {
    let itemStatusDict =
    {
        1: "Active",
        2: "Hold",
        3: "Discontinue",
        4: "Inactive",
        5: "Pending Approval",
        6: "Denied Approval",
        7: "Under Initialization"
    }
    // console.log(item['Warehouse_Information'])
    item['Status'] = itemStatusDict[item['Status']]
    item['Warehouse_Information'] = item['Warehouse_Information'].filter(line => !(line['Unit'].match(/BS.*/)))
    item['Warehouse_Information'] = item['Warehouse_Information'].map(line => {
        line['Status_Current'] = itemStatusDict[line['Status_Current']]
        return line
    })
    return item
}

function getItemObj(req) {
    var itemPromiseArr = []
    for (line of req['lines']) {
        if (line["Item"] == "NaN") {
            continue
        }
        itemPromiseArr.push(itemModel.findItem(line["Item"])
            .then(function (itm) {
                var witm = wrangleItem(itm[0])
                return witm
            }))
    }
    // itemsArr = Promise.all(itemPromiseArr).then(function(vs) {
    //     return vs})
    // console.log(itemsArr)
    // return itemsArr
    return Promise.all(itemPromiseArr).then(function (items) {
        var itemsobj = {}
        for (value of items) {
            itemsobj[value["Item_No"]] = value;
        }
        return itemsobj;
    })
}

// REQUEST, not REQUISITION
async function getPrintingObject(req, res) {
    const invBuyers = ["AKNOBEL", "DMARTINOS", "KLOVE", "NSEQUEA", "PHONG", "TSULLIVAN1"]
    var buyerName = req.params.buyer;
    var date = req.params.date;
    var entries = []
    var reqs = reqModel.getReqsForDate(date)
        .then(function (reqs) {
            let reqArr = [];
            for (req of reqs) {
                if (!req['Requester'].match(/^INVCYCC[24]/) || (buyerName == "*INV" && !invBuyers.includes(req["Buyer"]))) {
                    continue
                }
                var wreq = wrangleReq(req)
                var witem = getItemObj(wreq)
                console.log(witem)
                reqArr.push({ "entryreq": wreq, "entryitem": witem })
            }
            return reqArr
        })
        .then(function (values) {
            //  for (entry of values) {
            //      entry['entryitem'] = getItemObj(entry['entryreq']).then(function (v) { return v })
            //  }
            console.log(values)
            res.json(values)
        })

    // Promise.all([reqs]).then(function (vals) {
    //     console.log(vals[0])
    //     res.json(vals)
    // })

    console.log(buyerName, date)
}

// function getPrintingObject(req, res) {
//     const invBuyers = ["AKNOBEL", "DMARTINOS", "KLOVE", "NSEQUEA", "PHONG", "TSULLIVAN1"]
//     var buyerName = req.params.buyer;
//     var date = req.params.date;
//     var entries = []
//     reqModel.getReqsForDate(date)
//         .then(function (reqs) {
//             let reqArr = [];
//             for (req of reqs) {
//                 if (!req['Requester'].match(/^INVCYCC[24]/) || (buyerName == "*INV" && !invBuyers.includes(req["Buyer"]))) {
//                     continue
//                 }
//                 var wreq = wrangleReq(req)
//                 reqArr.push(wreq)
//             }
//             return reqArr
//         })
//         .then(function (wreqs) {
//             var objPromiseArr = []
//             for (req of wreqs) {
//                 var itemPromiseArr = []
//                 for (line of req['lines']) {
//                     if (line["Item"] == "NaN") {
//                         continue
//                     }
//                     itemPromiseArr.push(
//                         itemModel.findItem(line["Item"])
//                             .then(function (itm) {
//                                 var witm = wrangleItem(itm[0])
//                                 return witm
//                             }))
//                 }
//                 //console.log(req)
//                 objPromiseArr.push(Promise.all(itemPromiseArr).then(function (values) {
//                     var itemsobj = {}
//                     for (value of values) {
//                         itemsobj[value["Item_No"]] = value;
//                     }
//                     return { "entryreq": req, "entryitem": itemsobj };
//                 }))
//             }

//             return objPromiseArr
//         })
//         .then(function (finalObject) {
//             Promise.all(finalObject).then(function (values) {
//                 for (value of values) {
//                 }
//                 res.json(values)
//             })
//         })
//     console.log(buyerName, date)
//}

