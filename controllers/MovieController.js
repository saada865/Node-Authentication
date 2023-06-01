const Movie = require("../models/movieModel.js");

exports.createMovie = async (req, res) => {
    try{ 
        const newMovie = new Movie(req.body);      
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.displayMovies = async (req, res) => {
    try {
        const Movies = await Movie.find().populate("director");
        res.status(200).json(Movies); 
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};


exports.updateMovie = async function (req, res, next) {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ message: "Movie updated", movie });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating movie" });
    }
  };


  
exports.updateMoviePatch = async function (req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({ message: "Movie updated using patch", movie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating movie" });
  }
  };

  exports.deleteMovie = async function(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json({ message: "Movie deleted", movie });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting movie" });
    }
  };
  