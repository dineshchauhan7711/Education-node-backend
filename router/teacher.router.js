const router = require('express').Router();
const multer = require('../middleware/multer');
const { insertTeacher, updateTeacher, deleteTeacher, viewAll, viewById, howmanyTeacher } = require('../controller/teacher.ctrl');
const {verify, adminVerify} = require('../middleware/auth');
const uplaod = require('../middleware/multer');
router.post("/insert",adminVerify,multer.single("image"),insertTeacher);
router.put("/edit/:id",adminVerify,updateTeacher);
router.put("/edit-Image",adminVerify,multer.single("image"),)
router.delete("/delete/:id",adminVerify,deleteTeacher);
router.get("/list",adminVerify,viewAll);
router.get("/view/:id",adminVerify,viewById);
router.get("/count",adminVerify,howmanyTeacher);
module.exports = router
