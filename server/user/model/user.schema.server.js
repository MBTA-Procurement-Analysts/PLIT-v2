var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: String,
    fullname: String,
    email: String,
    loggedInBefore: Boolean

}, {collection: "user"});

module.exports = userSchema;