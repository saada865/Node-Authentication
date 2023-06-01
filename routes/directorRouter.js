const express = require("express");
const router = express.Router();

const director_controller = require("../controllers/DirectorController");
const { authorize } = require("../authMiddleware.js");

// Protected routes that require authentication
router.get("/", authorize, director_controller.displayDirectors);
router.post("/create", authorize, director_controller.createDirector);
router.put("/update/:id", authorize, director_controller.updateDirector);
router.patch("/update/:id", authorize, director_controller.updateDirectorPatch);
router.delete("/delete/:id", authorize, director_controller.deleteDirector);

module.exports = router;
