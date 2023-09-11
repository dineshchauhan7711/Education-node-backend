const mongoose = require("mongoose")
const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

},{
    collection:"contact"
})
module.exports = mongoose.model("contact", contactSchema)
