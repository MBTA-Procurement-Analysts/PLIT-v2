var mongoose = require('mongoose');
var counterSchema = require('./counter.schema.server');
var counterModel = mongoose.model('CounterModel', counterSchema);

counterModel.getCount = getCount;
counterModel.setCount = setCount;
counterModel.incrCount = incrCount;

module.exports = counterModel;

function getCount() {
    return counterModel.findOne({});
}

function setCount(num) {
    return counterModel.update({}, {$set: {"Count": num}});
}
function incrCount() {
    console.log("+1")
    return counterModel.findOneAndUpdate({},{$inc:{"Count": 1}},{"new":true});

}
