const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    image:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    category: {
        type: String,
        required:true
    },
    price:{
        required:true,
        type:String
    },
    active:{
        default:1,
        type:String   
    },

},{timestamps:true},{versionKey: false},{
    collection:"course"
})
module.exports = mongoose.model("course", courseSchema)
