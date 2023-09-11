const router = require('express').Router();
const {verify, adminVerify} = require("../middleware/auth");
const multer = require("../middleware/multer")
const { insertCourse, getCourseByName, courseList, getCourseById, deleteCourse, howmanyCourse, editCourse } = require("../controller/course.ctrl");
router.post("/insertCourse", adminVerify, multer.single("image"), insertCourse);
router.delete("/delete/:id",adminVerify,deleteCourse)
router.get("/search/:name",getCourseByName);
router.get("/viewbypage",courseList);
router.get("/view/:_id",getCourseById);
router.get("/count",adminVerify,howmanyCourse);
router.put("/edit/:id",adminVerify,editCourse)
module.exports = router;