const express = require("express");
const router = express.Router();
const auth = require("../controllers/authenticate.controller");
const passport = require("passport");

router.post("/login", auth.loginUser);
router.post(
  "/logout",
  passport.authenticate("cookie", { session: false }),
  auth.logout
);
router.get("/checkAuth", auth.checkAuth);
module.exports = router;
