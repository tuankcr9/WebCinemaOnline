var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.home);

router.get("/movies", adminController.getMovies);

router.get("/users-info", adminController.getUserInfo);

router.get("/", adminController.getMovies);

router.get("/create_movies", adminController.createMovies);

router.post("/create_movies", adminController.storeMovies);

router.get("/edit_movies", adminController.editMovies);

router.post("/edit_movies", adminController.confirmEditMovies);

router.get("/delete_movies", adminController.deleteMovies);

router.get("/cinemas", adminController.getCinemas);

router.get("/room", adminController.getRoom);

router.get("/schedule", adminController.getSchedule);

router.get("/tickets", adminController.getTickets);

module.exports = router;
