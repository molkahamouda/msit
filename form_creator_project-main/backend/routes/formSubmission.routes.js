const express = require("express");
const FormSubmissionController = require("../controllers/formSubmission.controller");

const router = express.Router();

router.post("/submitForm", FormSubmissionController.submitDataById);

module.exports = router;
