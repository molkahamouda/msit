const express = require("express");
const userContr = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", userContr.createUser);

module.exports = router;
