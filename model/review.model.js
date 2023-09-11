const mongoose = require("mongoose")
const reviewSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course'
    },
    review:{
        type:String,
        required:true
    }
    // profile:{

    // }
    // profile:user.image,
    //                     user_name:user.name,
    //                     review:data[i].review,
    //                     course_name:course.name

},{timestamps:true},{
    collection:"review"
})
module.exports = mongoose.model("review", reviewSchema)
