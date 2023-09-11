const router = require('express').Router();

const { insertContact } = require("../controller/contact.ctrl");
router.post("/detalis/insert",insertContact)

module.exports = router;