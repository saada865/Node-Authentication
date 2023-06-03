const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//passport
const { connectMongoose, User } = require("./databasePassport.js");
connectMongoose();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");

//MVC code cookies session code
// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/DirectorDB", { family: 4 });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// // Routes
// const directorRouter = require("./routes/directorRouter");
// const movieRouter = require("./routes/movieRouter");
// const shoppingCartRouter = require("./routes/shoppingCartRouter");

// // Apply the authentication middleware to relevant routes
// app.use("/directors", directorRouter);
// app.use("/movies", movieRouter);
// app.use("/shoppingCart", shoppingCartRouter);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const user = await new User.findOne({ username: req.body.username });

  if (user) {
    return res.status(400).send("User already exists");
  }
  const newUser = await User.create(req.body);
  res.status(201).send("Created");
});

//JWT Tokens Code

// const secretKey = "12345";

// app.get("/", (req, res) => {
//   res.json({
//     message: "a sample api",
//   });
// });

// app.post("/login", (req, res) => {
//   const user = {
//     id: 1,
//     username: "saad",
//     email: "email.com",
//   };
//   jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// app.post("/profile", verifyToken, (req, res) => {
//   jwt.verify(req.token, secretKey, (err, authData) => {
//     if (err) {
//       res.send({ result: "Invalid token" });
//     } else {
//       res.json({
//         message: "profile Accessed",
//         authData,
//       });
//     }
//   });
// });

// //middleware jwt
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     res.send({
//       result: "token is not valid",
//     });
//   }
// }

//This code is for cookies sessions

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser("12345-67890-09876-54321"));
// app.use(
//   session({
//     secret: "12345-67890-09876-54321", // Secret key to sign the session ID cookie
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Authentication middleware
// function authorize(req, res, next) {
//   if (req.session && req.session.user == "admin") {
//     next();
//   } else {
//     const err = new Error("You are not authenticated");
//     err.status = 401;
//     return next(err);
//   }
// }

// // Routes
// const directorRouter = require("./routes/directorRouter");
// const movieRouter = require("./routes/movieRouter");
// const shoppingCartRouter = require("./routes/shoppingCartRouter");

// // Apply the authentication middleware to relevant routes
// app.use("/directors", authorize, directorRouter);
// app.use("/movies", authorize, movieRouter);
// app.use("/shoppingCart", shoppingCartRouter);

// // Login route
// app.post("/login", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // Perform your authentication logic here
//   // ...

//   if (username == "admin" && password == "SE7") {
//     // Set the user cookie with the value "admin"
//     req.session.user = "admin";
//     res.cookie("user", "admin", { signed: true });
//     res.send("Authentication successful");
//   } else {
//     var err = new Error("You are not authenticated");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     next(err);
//   }
// });

// // Logout route
// app.post("/logout", (req, res) => {
//   req.session.destroy();
//   res.status(200).send("Logged out successfully");
// });

// Start the server
app.listen(4000, function () {
  console.log("Server is running");
});

// Latest index.js
