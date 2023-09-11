const teacherModel = require("../model/teacher.model");
const cloudinary = require("../middleware/util");
exports.insertTeacher = async(req,res) => {
    try {
        const data = await teacherModel.findOne({email:req.body.email})
        if(data){
            res.status(409).json({
                message:"ALREADY EXIST",
                status:409
            })
        }
        else{
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
            
            const teacher = new teacherModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                education:req.body.education,
                age:req.body.age,
                experience:req.body.experience,
                course:req.body.course,
                salary:req.body.salary,
                image:newPath.res
            })
            const saveData = await teacher.save()
            res.status(200).json({
                message:"SALES TALENT IS INSERTED SUCCESSFULLY",
                status:200,
                data:saveData
            })
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG....",
            status:500
        })
    }
}
exports.updateTeacher = async(req,res) => {
    try {
        const data = await teacherModel.findById({_id:req.params.id})
        if(data){
            
            await teacherModel.findByIdAndUpdate({_id:req.params.id},{
                $set:{
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    education:req.body.education,
                    age:req.body.age,
                    experience:req.body.experience,
                    course_id:req.body.id
                }
            })
            res.status(200).json({
                message:"SALES TALENT IS UPDATED SUCCESSFULLY",
                STATUS:200
            })
        }
        else{
            res.status(404).json({
                message:"SALES TALENT IS NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.deleteTeacher = async(req,res)=>{
    try {
        const data  = await teacherModel.findById({_id:req.params.id})
        if(data){
            const deleteTeacher = await teacherModel.findByIdAndDelete({_id:req.params.id})
            res.status(200).json({
                message:"SALES TALENT IS DELETED SUCCESSFUL",
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"SALES TALENT IS NOT FOUND",
                status:404
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.viewById = async(req,res) => {
    try {
        const data = await teacherModel.findById({_id:req.params.id})
        if(data){
            res.status(200).json({
                message:"SUCCESSFUL",
                status:200,
                data:data
            })
        }
        else{
            res.status(404).json({
                message:"SALES TALENT IS NOT FOUND",
                status:404
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.viewAll = async(req,res)=>{
    try {
        const data  = await teacherModel.find()
        if(data[0]){
            res.status(200).json({
                message:"SUCCESSFUL",
                status:200,
                data:data
            })
        }
        else{
            res.status(404).json({
                message:"SALES TALENT IS NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
exports.howmanyTeacher = async(req,res)=>{
    try {
        const data  = await teacherModel.find()
        if(data[0]){
            res.status(200).json({
                message:"SUCCESSFUL",
                status:200,
                data:data.length
            })
        }
        else{
            res.status(200).json({
                message:"SUCCESSFUL",
                status:200,
                data:0
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}