const express = require("express");
const router = express.Router();

const movie_controller = require("../controllers/MovieController");

router.get("/", movie_controller.displayMovies);

router.post("/create", movie_controller.createMovie);

router.put("/update/:id", movie_controller.updateMovie);

router.patch("/update/:id", movie_controller.updateMoviePatch);

router.delete("/delete/:id", movie_controller.deleteMovie);

module.exports = router;