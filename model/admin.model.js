const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminSchema = mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    token: {
        type: String
    }

},{versionKey: false},{
    collection:"admin"
})
adminSchema.methods.generateauthtoken = async function () {
        const t = jwt.sign({ _id: this._id.toString() }, process.env.secret)
        this.token = t;
        await this.save();
        return t;
}
module.exports = mongoose.model("admin", adminSchema)