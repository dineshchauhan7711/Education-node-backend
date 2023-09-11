const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
        required: true,
        type: String
    },
    email:{
        required:true,
        type:String
    },
    course:{
        type:String,
        default:""
    },
    fees:{
        type:String
    },
    password:{
        required:true,
        type:String
    },
    gender:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    token: {
        type: String
    },
    otp:{
        type :Number
    }

},{timestamps:true},{versionKey: false},{
    collection:"user"
})
userSchema.methods.generateauthtoken = async function () {
        const t = jwt.sign({ _id: this._id.toString() }, process.env.secret)
        this.token = t;
        await this.save();
        return t;
}
module.exports = mongoose.model("user", userSchema)