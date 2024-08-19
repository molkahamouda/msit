const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
var randtoken = require("rand-token");
const database = require("../config/database");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      error = "user not found";
      return res.status(401).json({ error, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      error = "password incorrect";
      return res.status(402).json({ error, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, database.secretjwtKey, {
      expiresIn: "2h",
    });

    const refreshToken = randtoken.uid(256);

    User.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    ).then((user) => {
      res
        .status(200)
        .cookie("UTK", "Bearer " + token, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 10000 * 1000),
          httpOnly: true,
          secure: true,
        })
        .cookie("RTK", refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 10100 * 1000),
          httpOnly: true,
          secure: true,
        })
        .json({
          error: false,
          message: "Login Successful",
          data: {
            id: user._id,
            username: user.username,
          },
        });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.checkAuth = (req, res) => {
  if (req.user != null) {
    res.status(200).send({
      error: false,
      message: "checked",
      data: { name: req.user.name },
    });
  } else {
    User.findOne({ refreshToken: req.cookies.RTK }).then((user) => {
      if (user) {
        const payload = {
          id: user.id,
        };

        const token = jwt.sign(payload, database.secretjwtKey, {
          expiresIn: "4h",
        });

        const refreshToken = randtoken.uid(256);

        User.findByIdAndUpdate(
          user.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        ).then((user) => {
          res
            .status(200)
            .cookie("UTK", "Bearer " + token, {
              sameSite: "strict",
              path: "/",
              expires: new Date(new Date().getTime() + 10000 * 1000),
              httpOnly: true,
              secure: true,
            })
            .cookie("RTK", refreshToken, {
              sameSite: "strict",
              path: "/",
              expires: new Date(new Date().getTime() + 10100 * 1000),
              httpOnly: true,
              secure: true,
            })
            .json({
              error: false,
              message: "Connected successfully",
              data: {
                id: user._id,
                username: user.username,
              },
            });
        });
      } else {
        res.status(200).send({
          error: false,
          message: "null",
          data: null,
        });
      }
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("RTK").clearCookie("UTK").status(200).json({
    error: false,
    message: "Disconnected successfully",
    data: null,
  });
};
