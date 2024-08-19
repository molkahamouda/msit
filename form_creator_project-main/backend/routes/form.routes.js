const express = require("express");
const {
  create,
  getMyForms,
  deleteById,
} = require("../controllers/form.controller");

const router = express.Router();

router.post("/", create);
router.get("/getMyForms/:userid", getMyForms);
router.delete("/delete/:id", deleteById);

module.exports = router;
