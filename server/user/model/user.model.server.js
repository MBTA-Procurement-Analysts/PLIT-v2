var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId= findUserByFacebookId;
userModel.addFavorite = addFavorite;
userModel.isFavorited = isFavorited;
userModel.followUser = followUser;
userModel.signalLoggedInBefore = signalLoggedInBefore;
module.exports = userModel;
function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUsers(){
    return userModel.find();
}

function findUserByUsername(username) {
    console.log('username: '+username);
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser){
    delete newUser.username;
    return userModel.update({_id: userId}, {$set: newUser});
}
function signalLoggedInBefore(userId){
    return userModel.update({_id: userId}, {loggedInBefore: true});
}
function addFavorite(newsId, user){
    user.favorites.push(newsId);
    console.log(user.favorites);
    console.log('adding fav');
    console.log(user);
    return userModel.update({_id: user._id}, {$set: user});
}

function followUser(userId, user){
    console.log(user);
    console.log(userId);
    user.following.push(userId);
    console.log(user.following);
    console.log('adding fav');
    return userModel.update({_id: user._id}, {$set: user});
}

function isFavorited(newsId, user){
    return userModel.findOne({_id: user._id, favorites: newsId});
}

function deleteUser(userId){
    console.log('deleting user '+userId);
    return userModel.remove({_id: userId});
}
function findUserByFacebookId(facebookId){
    console.log(facebookId);
    return userModel.findOne({'facebook.id': facebookId});
}