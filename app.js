const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const entriesRouter = require("./routes/entries");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require("path");
var compression = require("compression");
var helmet = require("helmet");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

// Start express backend

//SERVER SETUP
var app = express();
var port = process.env.PORT || 3001;

// Took advice from docs
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));

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
      callbackURL:
        "https://sleep-diary-app.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("Logging facebook info");
      console.log(profile.displayName);
      console.log(profile.id);

      // for user details to be public
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
const loginError = (err, req, res, next) => {
  console.log(`There was a facebook login error: ${err}`);
  res.redirect("https://sleep-diary-app.herokuapp.com/");
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
