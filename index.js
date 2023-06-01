const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/DirectorDB", { family: 4 });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app.use(cookieParser("your-secret-key"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("12345-67890-09876-54321"));
app.use(
  session({
    secret: "12345-67890-09876-54321", // Secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication middleware
function authorize(req, res, next) {
  if (req.session && req.session.user == "admin") {
    next();
  } else {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  }
}

// Routes
const directorRouter = require("./routes/directorRouter");
const movieRouter = require("./routes/movieRouter");
const shoppingCartRouter = require("./routes/shoppingCartRouter");

// Apply the authentication middleware to relevant routes
app.use("/directors", authorize, directorRouter);
app.use("/movies", authorize, movieRouter);
app.use("/shoppingCart", shoppingCartRouter);

// Login route
app.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Perform your authentication logic here
  // ...

  if (username == "admin" && password == "SE7") {
    // Set the user cookie with the value "admin"
    req.session.user = "admin";
    res.cookie("user", "admin", { signed: true });
    res.send("Authentication successful");
  } else {
    var err = new Error("You are not authenticated");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);
  }
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send("Logged out successfully");
});

// Start the server
app.listen(4000, function () {
  console.log("Server is running");
});

// Latest index.js
