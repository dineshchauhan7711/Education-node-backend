
const jwt = require("jsonwebtoken");
const auth = require("../model/user.model");
const admin = require("../model/admin.model")
exports.verify = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if(token){

            const verifyUser = jwt.verify(token,process.env.secret )
            const user = await auth.findOne({ _id: verifyUser._id })
            if(user.token==token){
    
                req.token = token
                req.user = user
                next()
            }
            else{
                res.status(500).json({
                    message:"please, login",
                    status:500
                })
            }
        }
        else{
            res.status(500).json({
                message:"please, login",
                status:500
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            status:500
        })
    }
}
exports.adminVerify = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if(token){

            const verifyUser = jwt.verify(token,process.env.secret )
            const user = await admin.findOne({ _id: verifyUser._id })
            if(user.token==token){
    
                req.token = token
                req.user = user
                next()
            }
            else{
                res.status(500).json({
                    message:"please, login",
                    status:500
                })
            }
        }
        else{
            res.status(500).json({
                message:"please, login",
                status:500
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            status:500
        })
    }
}
