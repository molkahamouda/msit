const { jwtDecode } = require('jwt-decode');
const CookieStrategy = require("passport-cookie").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (passport) => {
  passport.use(
    new CookieStrategy(
      {
        cookieName: "UTK",
        passReqToCallback: true,
      },
      function (req, token, done) {
        const payload = jwtDecode(token.slice(13));
        User.findById(payload.id).then((user) => {
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );
};
