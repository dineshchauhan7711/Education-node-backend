const router = require('express').Router();
const {verify, adminVerify} = require("../middleware/auth");
const { insertReview, viewAll } = require("../controller/review.ctrl");
router.post("/add/:_id",verify,insertReview);
router.get("/viewReview",adminVerify,viewAll);
module.exports = router;