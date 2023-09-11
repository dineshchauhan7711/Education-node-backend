const router = require('express').Router();
const {verify, adminVerify} = require("../middleware/auth");
const multer = require("../middleware/multer")
const {registration, login, forgotPaswword, changePassword, getuserInfo, updateProfile, getStudent, AdminLogin, applyCourse, viewById, deleteStudent, howmanyStudent} = require('../controller/user.ctrl');
router.post("/registration",registration);
router.post("/login",login);
router.post("/adminLogin",AdminLogin);
router.post("/passwordforget",forgotPaswword);
router.put("/changePassword",verify, changePassword);
router.get("/profile",verify,getuserInfo);
router.get("/students",adminVerify,getStudent);
router.get("/student/:_id",adminVerify,viewById)
router.put("/profileUpdate",verify,multer.single("image"),updateProfile);
router.get("/apply/:id",verify,applyCourse);
router.delete("/delete/:_id",adminVerify,deleteStudent);
router.get("/count",adminVerify,howmanyStudent);
module.exports = router;