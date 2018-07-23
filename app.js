const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const entriesRouter = require("./routes/entries");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var compression = require("compression");
var helmet = require("helmet");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

// Start express backend

//SERVER SETUP
var app = express();
var port = process.env.PORT || 3001;
var server = app.listen(port);
app.use("public", express.static(path.join(__dirname, "./client/build")));

// Enable CORS
app.all("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Enable gzip/deflate compression for all routes and responses
app.use(compression());

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// Body parser middlewar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/entries", entriesRouter);

// facebook auth 2
var FACEBOOK_APP_ID = require("./config/keys").FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = require("./config/keys").FACEBOOK_APP_SECRET;
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "https://localhost:3001/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      username = profile.displayName;
      userId = profile.id;

      // for user details to be public
      module.exports.userId = userId;
      done(null);
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// facbeook login error
const loginError = (req, res, next) => {
  console.log(`There was a facebook login error`);
  res.redirect("http://localhost:3000/");
};
app.use("/login", loginError);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

// DB Config
const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(`This is the mongoDB error: ${err}`));

// export
module.exports = app;
