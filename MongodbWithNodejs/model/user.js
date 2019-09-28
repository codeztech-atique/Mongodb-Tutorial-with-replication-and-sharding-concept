const mongoose = require('mongoose');

var userData = mongoose.model('customerDetails',{
    email:{type : String},
    password:{type : String},
    name: {type: String},
    registration_date: {type: Date},
    createAt: {type: Date, default: Date.now} 
})

module.exports = {userData}