const Director = require("../models/directorModel.js");

exports.displayDirectors = function (req, res) {
  Director.find()
    .exec()
    .then(function (list_directors) {
      res.json({
        title: "Director List",
        director_list: list_directors,
      });
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    });
};

exports.createDirector = async function (req, res) {
  const director = new Director({
    name: req.body.name,
    bio: req.body.bio,
    nationality: req.body.nationality,
  });

  try {
    await director.save();
    res.json({ message: "Director created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating director" });
  }
};

exports.updateDirector = async function (req, res, next) {
  try {
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Director updated", director });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating director" });
  }
};

exports.updateDirectorPatch = async function (req, res) {
  try {
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({ message: "Director updated using patch", director });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating director" });
  }
};

exports.deleteDirector = async function (req, res) {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }
    res.json({ message: "Director deleted", director });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting director" });
  }
};

// const axios = require("axios");

// exports.displayDirectors = function (req, res) {
//   axios
//     .get("http://localhost:4000/directors", {
//       headers: {
//         Cookie: "user=admin",
//       },
//     })
//     .then(function (response) {
//       res.json(response.data);
//     })
//     .catch(function (error) {
//       console.log(error.response.data);
//       res.status(500).json({
//         message: "An error occurred",
//         error: error.response.data,
//       });
//     });
// };
