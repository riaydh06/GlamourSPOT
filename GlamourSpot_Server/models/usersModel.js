const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type:String, 
        required: [true, 'Email is required']
    }, 
    password: {
        type:String, 
        required: [true, 'Password is required']
    }, 
    username: {
        type: String, 
        required: [true, 'Username is required']
    }, 
    profileImage: {
        type:String
    }, 
    bio:{
        type:String
    }
});

module.exports = mongoose.model('users', UserSchema);