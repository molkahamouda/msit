const express = require("express");
const connectDB = require("./config/db");
const formRoutes = require("./routes/form.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const formSubmissionRoutes = require("./routes/formSubmission.routes");
const cors = require("cors");
var bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();

connectDB();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    secret: "yourSecretKey", // Replace with your secret
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middlware
app.use(cookieParser());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const allowedOrigins = ["http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api/forms", formRoutes);
app.use("/api/users", userRoutes);
app.use("/api", formSubmissionRoutes);
app.use("/", authRoutes);
