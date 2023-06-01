const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.connect("mongodb://localhost:27017/DirectorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const directorRouter = require("./routes/directorRouter");
const movieRouter = require("./routes/movieRouter");
const shoppingCartRouter = require("./routes/shoppingCartRouter");

app.use("/directors", directorRouter);
app.use("/movies", movieRouter);
app.use("/shoppingCart", shoppingCartRouter);

app.listen(4000, function () {
  console.log("Server is running");
});
