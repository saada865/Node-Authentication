const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        title: String,
        budget: String,
        revenue: String,
        rating: String,
        director: mongoose.Schema.Types.ObjectId

    }
);

module.exports = mongoose.model("Movie", movieSchema)