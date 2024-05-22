var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.home);

router.post('/search', homeController.searchMovie)

router.get('/search/:tag', homeController.searchTag)

router.get('/movie/upcoming', homeController.getUpcomingMovies);

router.get('/movie/now-showing', homeController.getNowShowingMovies);

router.get('/movie/:id', homeController.getDetailMovie);

module.exports = router;
