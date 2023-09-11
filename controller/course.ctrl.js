const courseModel = require("../model/course.model");
const cloudinary = require("../middleware/util");
const userModel = require("../model/user.model");
const reviewModel = require("../model/review.model");
exports.insertCourse = async (req, res) => {
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
        console.log("dbsnahb",file);
        const { path } = file;
        const newPath = await cloudnaryImageUpload(path);
        const course = new courseModel({
            image: newPath.res,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        })
        const data = await course.save();
        res.status(200).json({
            message: "SUCCESS",
            data: data,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
exports.editCourse = async (req, res) => {
    try {
        const course = await courseModel.findById({_id:req.params.id})
        if (course) {
            await courseModel.findByIdAndUpdate({ _id: req.params.id }, {
                description: req.body.description,
                price: req.body.price,
            })
            res.status(200).json({
                message: "COURSE EDITED SUCCESSFUL",
                status: 200
            })
        }
        else {
            res.status(404).json({
                message: "COURSE NOT FOUND",
                status: 404
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
exports.deleteCourse = async (req, res) => {
    try {
        const course = await courseModel.findById({ _id: req.params.id })
        if (course) {
            const user = await userModel.find({ course_id: course._id })
            const review = await reviewModel.find({ course_id: course._id })
            if (user[0]) {
                for (let i = 0; i < user.length; i++) {
                    await userModel.findByIdAndUpdate({ _id: user[i]._id }, {
                        $set: {
                            fees: "",
                            course_id: ""
                        }
                    })
                }
                if (review[0]) {
                    for (let i = 0; i < review.length; i++) {
                        await reviewModel.findOneAndDelete({ _id: review[i]._id })
                    }

                }
                else {
                    await courseModel.findByIdAndDelete({ _id: req.params.id })

                    res.status(200).json({
                        message: "COURSE DELETED SUCCESSFUL",
                        status: 200
                    })
                }
            }
            else {
                if (review[0]) {
                    for (let i = 0; i < review.length; i++) {
                        await reviewModel.findOneAndDelete({ _id: review[i]._id })
                    }
                    await courseModel.findByIdAndDelete({ _id: req.params.id })

                    res.status(200).json({
                        message: "COURSE DELETED SUCCESSFUL",
                        status: 200
                    })
                }
                else {
                    await courseModel.findByIdAndDelete({ _id: req.params.id })

                    res.status(200).json({
                        message: "COURSE DELETED SUCCESSFUL",
                        status: 200
                    })
                }
            }



        }
        else {
            res.status(404).json({
                message: "COURSE NOT FOUND....",
                status: 404
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
exports.courseList = async (req, res) => {
    try {
        let { page, size } = req.query;

        // If the page is not applied in query.
        if (!page) {

            // Make the Default value one.
            page = 1;
        }

        if (!size) {
            size = 10;
        }
        const limit = parseInt(size);
        const data = await courseModel.find().sort().limit(limit)
        if (data[0]) {
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: data
            })
        }
        else {
            res.status(404).json({
                message: "NOT FOUND ANY COURSES",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "SOMETHINNG WENT WRONG",
            status: 500
        })
    }
}
exports.howmanyCourse = async(req,res) => {
    try {
        const data = await courseModel.find()
        if (data[0]) {
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: data.length
            })
        }
        else {
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: 0
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "SOMETHINNG WENT WRONG",
            status: 500
        })
    }
}
exports.getCourseByName = async (req, res) => {
    try {
        const course = await courseModel.findOne({ name: req.params.name })
        if (course) {
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: data
            })
        }
        else {
            res.status(404).json({
                message: "NOT FOUND ANY COURSES",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "SOMETHINNG WENT WRONG",
            status: 500
        })
    }
}
exports.getCourseById = async (req, res) => {
    try {
        const course = await courseModel.findById({ _id: req.params._id })
        if (course) {
            res.status(200).json({
                message: "SUCCESS",
                status: 200,
                data: course
            })
        }
        else {
            res.status(404).json({
                message: "NOT FOUND ANY COURSES",
                status: 404
            })
        }
    } catch (error) {
        console.log("sbdjs", error);
        res.status(500).json({
            message: "SOMETHINNG WENT WRONG",
            status: 500
        })
    }
}
