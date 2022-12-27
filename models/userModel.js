const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
},{timestamps:true})

module.exports = mongoose.model('users',userSchema);