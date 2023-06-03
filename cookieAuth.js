var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var teacherRouter = require("./routes/teacher");
var headRouter = require("./routes/head");
var cors = require("cors");

var url = "mongodb://127.0.0.1:27017/lms";
const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var app = express();
connection.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // using cookies
app.use(cookieParser("12345-67890-09876-54321"));
function authorize(req, res, next) {
  console.log(req.signedCookies);
  if (!req.signedCookies.user) {
    var authorizeHeader = req.headers.authorization;
    if (!authorizeHeader) {
      var err = new Error("You are not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
    var auth = new Buffer.from(authorizeHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var username = auth[0];
    var password = auth[1];
    if (username == "admin" && password == "SE7") {
      res.cookie("user", "admin", { signed: true });
      next();
    } else {
      var err = new Error("Your are not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user == "admin") {
      next();
    } else {
      var err = new Error("Your are not authenticated");
      err.status = 401;
      next(err);
    }
  }
}

app.use(authorize);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/head", headRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
