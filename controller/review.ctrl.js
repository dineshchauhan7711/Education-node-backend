const courseModel = require("../model/course.model");
const reviewmodel = require("../model/review.model");
const userModel = require("../model/user.model");
exports.insertReview = async (req, res) => {
    try {
        const coursedata = await courseModel.findById({_id:req.params._id}) 
        if(coursedata){

            const data = new reviewmodel({
                user_id: req.user._id,
                course_id: req.params._id,
                review: req.body.review
            })
            const review = await data.save();
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: review
            })
        }
        else{
            res.status(404).json({
                message:"COURSE NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
exports.viewAll = async (req, res) => {
    try {
        const data = await reviewmodel.find();
        const arr = [];
        if (data[0]) {
            for (let i = 0; i < data.length; i++) {
                const user = await userModel.findById({_id:data[i].user_id});
                const course = await courseModel.findById({_id:data[i].course_id});
                if (user) {
                    if(course){
                      const obj = {
                        profile:user.image,
                        user_name:user.name,
                        review:data[i].review,
                        course_name:course.name
                      }  
                      arr.push(obj);
                    }
                    else{
                        res.status(404).json({
                            message:"COURSE NOT FOUND",
                            status:404
                        })
                    }
                }
                else{
                    res.status(404).json({
                        message:"USER NOT FOUND",
                        status:400
                    })
                }
            }
            res.status(200).json({
                message:"REVIEW'S DATA GET SUCCESSFULLY",
                status:200,
                data:arr
            })
        }
        else{
            res.status(404).json({
                message:"REVIEW NOT FOUND",
                status:404
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}