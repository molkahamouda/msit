const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  try {
    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.email = "User exists";
        return res.status(400).json({
          errors: errors,
          error: true,
          message: errors.email,
          status: "error",
        });
      }
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.send({
              error: true,
              message: "error",
              status: "success",
            });
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.send({
                error: false,
                message: "User saved successfully",
                status: "success",
              })
            )
            .catch((err) => {
              res.send({
                error: true,
                message: "error",
                status: "error",
              });
            });
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
