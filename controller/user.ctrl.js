const user = require("../model/user.model");
const Admin = require("../model/admin.model");
const courseModel = require("../model/course.model");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middleware/util");
const bcrypt = require("bcrypt");
const { mailService } = require("../helper/mail.helper");

exports.registration = async(req,res) => {
    try {
        const data = await user.findOne({email:req.body.email})
        if(!data){
            if(req.body.gender === 'male'){
                var img = "https://res.cloudinary.com/dxrwia7os/image/upload/v1678772416/leli86oybphoie2mv3ql.jpg"
            }
            else{
                var img = "https://res.cloudinary.com/dxrwia7os/image/upload/v1678772961/ndwoyjyb1i5n6gudqsqj.jpg"
            }
            if(req.body.password!==req.body.confirmPassword){
                res.status(400).json({
                    message:"PASSWORD AND CONFIRMPASSWORD DOES NOT MATCH",
                    status:400
                })
            } 

            else{
                let otp =  Math.floor(1000 + Math.random() * 9000);
                const User = new user({
                    name:req.body.name,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
                    wallet:req.body.wallet || 0 ,
                    gender:req.body.gender,
                    image:img,
                    otp:otp
                })
                const saveData = await User.save();
                let sub = "start using this system now";
                let html = `<p>your email verify code is <b> ${otp} </b> </p>`;
    
                await mailService(req.body.email, sub, html)
                res.status(200).json({
                    message:"REGISTRATION SUCCESSFULLY, PLZZ CHECK YOUR REGISTER EMAIL FOR VERIFY EMAIL",
                    data:saveData,
                    status:200
                })  
            }
        }
        else{
            console.log("bsanjn");
            res.status(409).json({
                message:"THIS EMAIL IS ALREADY EXIST",
                status:409
            })
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.verifyEmail = async(req,res)=>{
    try {
       const data = await user.findById({_id:req.params.id})
       if(data){
            if(data.otp == req.body.otp){
                res.status(200).json({
                    message:"YOUR REGISTER EMAIL IS VERIFIED SUCCESSFULLY",
                    status:200
                })
            }
            else{
                await user.findByIdAndDelete({_id:req.params.id})
                res.status(400).json({
                    message:"YOUR REGISTER EMAIL IS NOT VERIFIED, PLEASE TRY AGAIN LETTER",
                    status:400
                })
            }
       }
       else{
        res.status(404).json({
            message:"UESR NOT FOUND",
            status:404
        })
       }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.deleteStudent = async(req,res)=>{
    try {
        const student = await user.findById({_id:req.params._id})
        if(student){

            const data  = await user.findByIdAndUpdate({_id:req.params._id},{$set:{
                course:"",
                fees:""
            }})
            res.status(200).json({
                message:"DELETED SUCCESSFULLY",
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"USER NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.login = async (req, res) => {
    try {
        const password = req.body.password;
        const data = await user.findOne({ email: req.body.email })
        if (data) {
            console.log(data);
            const token = await data.generateauthtoken()
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 300000 * 3),
            //     httpOnly: true
            // })
            bcrypt.compare(password, data.password, (err, data) => {
                // if (err) than throw error
                //if both match than you can do anything
                if (data) {
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 300000 * 3),
                        httpOnly: true
                    })
                    return res.status(200).json({
                        message: "LOGIN SUCCESS",
                        status: 200,
                        data: token
                    })
                } else {
                    console.log("hjs");
                    res.status(401).json({
                         message: "INVALID CREDANTIAL" ,
                         status:401
                    })
                }

            })
        } else {
            res.status(404).json(
                {
                    message: "USER NOT FOUND",
                    status: false,
                    code: 404,
                    statusCode: 0
                }
            )
        }
    } catch (error) {
        console.log("login error::", error);
        res.status(500).json(
            {
                message: "Something Went Wrong",
                status: false,
                code: 500,
            }
        )
    }
}
exports.AdminLogin = async (req, res) => {
    try {
        const password = req.body.password;
        const data = await Admin.findOne({ email: req.body.email })
        if (data) {
            console.log(data);
            const token = await data.generateauthtoken()
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000 * 3),
                httpOnly: true
            })
            bcrypt.compare(password, data.password, (err, data) => {
                // if (err) than throw error
                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({
                        message: "LOGIN SUCCESSFULLY",
                        status: 200,
                        data: token
                    })
                } else {
                    console.log("hjs");
                    res.status(401).json({
                         message: "INVALID CREDANTIAL" ,
                         status:401
                    })
                }

            })
        } else {
            res.status(404).json(
                {
                    message: "USER NOT FOUND",
                    status: 404,
                   
                }
            )
        }
    } catch (error) {
        console.log("login error::", error);
        res.status(500).json(
            {
                message: "Something Went Wrong",
                status: false,
                code: 500,
            }
        )
    }
}
exports.forgotPaswword = async(req,res)=>{
    try {
        const data = await user.findOne({email:req.body.email})
        if(data){
            function generateP() {
                var pass = '';
                var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
                  
                for (let i = 1; i <= 8; i++) {
                    var char = Math.floor(Math.random()
                                * str.length + 1);
                      
                    pass += str.charAt(char)
                }
                  
                return pass;
            }
            let p = generateP()
            let sub = "start using this system now";
            let html = `<p>your new password is ${p} </p>`;

            await mailService(data.email, sub, html)
            await user.findByIdAndUpdate({_id:data._id},{
                $set:{
                    password:bcrypt.hashSync(p, bcrypt.genSaltSync(8), null)
                }
            })
            res.status(200).json({
                message:"PLZZ, CHECK YOUR EMAIL",
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"YOU ARE NOT REGISTERED",
                status:404
            })
        }
    } catch (error) {
        console.log("for",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.updateProfile = async(req,res) => {
    try {

        const cloudnaryImageUpload = async file => {
            return new Promise(reslove => {
                cloudinary.uploader.upload(file, (err, res) => {
                 
                    if (err) return err
                    reslove({
                        res: res.secure_url
                    })
                })
            })
        }
        const file = req.file;
        const { path } = file;
        const newPath = await cloudnaryImageUpload(path);
        
        const update = await user.findByIdAndUpdate({_id:req.user._id},{
            $set:{
                image:newPath.res
            }
        })
        res.status(200).json({
            message:"PROFILE IS UPDATED SUCCESSFULLY",
            status:200
        })
    } catch (error) {
        console.log("for",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.getuserInfo = async(req,res)=>{
    try {
        const data = await user.findById({_id:req.user._id})
        if(data){
            res.status(200).json({
                message:"SUCCESS",
                info:data,
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"USER NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        console.log("getuser err",error);
            res.status(500).json({
                message:"SOMETHING WENT WRONG",
                status:500
            })
    }
}
exports.viewById = async(req,res)=>{
    try {
        const data = await user.findById({_id:req.params._id})
        if(data){
            res.status(200).json({
                message:"SUCCESS",
                info:data,
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"USER NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        console.log("getuser err",error);
            res.status(500).json({
                message:"SOMETHING WENT WRONG",
                status:500
            })
    }
}
exports.applyCourse = async(req,res) => {
    try {
        const course = await courseModel.findById({_id: req.params.id})
        if(course){
            const updateCourse = await user.findByIdAndUpdate({_id:req.user._id},{
                $set:{
                        course_id: course._id,
                        course:course.name,
                        fees:course.price
                }
            })
            res.status(200).json({
                message:"APPROV YOUR PROFILE",
                status:200
            })
        }else{
            res.status(404).json({
                message:"COURSE NOT FOUND",
                status:200
            })
        }
    } catch (error) {
            console.log("getuser err",error);
            res.status(500).json({
                message:"SOMETHING WENT WRONG",
                status:500
            })
    }
}
exports.getStudent = async(req,res)=>{
    try {
        
        const student = await user.find({course:{$ne:""}})
        if(student[0]){
            res.status(200).json({
                message:"STUDENT LIST",
                status:200,
                data:student
            })
        }
        else{
            res.status(404).json({
                message:"NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        console.log("getuser err",error);
            res.status(500).json({
                message:"SOMETHING WENT WRONG",
                status:500
            })
    }
}
exports.howmanyStudent = async(req,res)=>{
    try {
        
        const student = await user.find({course:{$ne:""}})
        if(student[0]){
            res.status(200).json({
                message:"STUDENT LIST",
                status:200,
                data:student.length
            })
        }
        else{
            res.status(200).json({
                message:"STUDENT LIST",
                status:200,
                data:student.length
            })
        }
    } catch (error) {
        console.log("getuser err",error);
            res.status(500).json({
                message:"SOMETHING WENT WRONG",
                status:500
            })
    }
}
exports.changePassword = async(req,res) => {
    try {
        console.log("bhjbhj");
        const oldpassword = req.body.oldpassword
        const password  = req.body.password
        const confirmPassword = req.body.confirmPassword
        bcrypt.compare(oldpassword,req.user.password,async(err,data)=>{
            if(data){
                if(password==confirmPassword){
                   const updatePassword = await user.findByIdAndUpdate({_id:data._id},{
                        $set:{
                            password:bcrypt.hashSync(password.bcrypt.genSaltSync(8), null)
                        }
                    })
                    res.status(200).json({
                        message:"PASSWORD CHANGED SUCCESSFULLY",
                        status:200
                    })
                }
                else{
                    res.status(400).json({
                        message:"PASSWORD & CONFIRM PASSWORD DOES NOT MATCHED",
                        status:400
                    })
                }
            }
            else{
                res.status(400).json({
                    message:"PASSWORD DOES NOT MATCHED",
                    status:400
                })
            }
        })
    } catch (error) {
        console.log("getuser err",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}