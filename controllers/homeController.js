var connection = require("../utils/connectDB");

module.exports = {
	// đến trang chủ và lưu user, user_id vào session
	home: function (req, res) {
		const user = req.session.user
		const idUser = req.session.idUser
		const limit = 4;
		const nowShowingMoviesQuery = "SELECT * FROM movies WHERE movie_status='now_showing' LIMIT ?";
		const upcomingMoviesQuery = "SELECT * FROM movies WHERE movie_status='upcoming'";
		connection.query(nowShowingMoviesQuery, [limit], (error, showingResults) => {
			if (error) throw error;
			connection.query(upcomingMoviesQuery, (error, upcomingResults) => {
				if (error) throw error;
				res.render("index", { idUser,user,footer: true, navHeader: true, nowShowingMovies: showingResults, upcomingMovies: upcomingResults });
			});
		});
	},

	//Hiển thị phim sắp chiếu
	getUpcomingMovies: function (req, res) {
		const upcomingMoviesQuery = "SELECT * FROM movies WHERE movie_status='upcoming'";
		connection.query(upcomingMoviesQuery, (error, results) => {
			if (error) throw error;

			res.render("upcoming", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, upcomingMovies: results });
		});
	},

	//Hiển thị phim đang chiếu
	getNowShowingMovies: function (req, res) {
		const nowShowingMoviesQuery = "SELECT * FROM movies WHERE movie_status='now_showing'";
		connection.query(nowShowingMoviesQuery, (error, results) => {
			if (error) throw error;

			res.render("now-showing", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, nowShowingMovies: results });
		});
	},

	//Hiển thị phim theo tìm kiếm
	searchMovie: function (req, res) {
		var sql = `Select * from movies Where movie_name like '${req.body.search} %' or movie_name like '% ${req.body.search}' or movie_name like '%${req.body.search}%' or movie_name = '${req.body.search}'`;
		console.log(sql);
		connection.query(sql, function (err, result) {
			if (result.length > 0) {
				return res.render("search", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, movies: result, number: result.length });
			} else {
				return res.render("search", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, notFound: true });
			}
		});
	},

	//Hiển thị phim theo chuyên mục
	searchTag: function (req, res) {
		var sql = `Select * from movies Where movie_genres like '%${req.params.tag}%' or movie_genres = '${req.params.tag}'`;
		console.log(sql);
		connection.query(sql, function (err, result) {
			if (result.length > 0) {
				return res.render("search_by_tag", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, moviesByTag: result, tag: req.params.tag });
			} else {
				return res.render("search_by_tag", {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true });
			}
		});
	},
	
	//Hiển thị thông tin chi tiết phim
	getDetailMovie: function(req, res) {
        const movieId = req.params.id;
        let query = "SELECT * FROM movies WHERE movie_id = ?";
        connection.query(query, [movieId], function(error, results) {
          if (error) throw error;
		   query = "select * from cinemas"
		  connection.query(query, function(err, result1){
			if(err) throw err
			return res.render('detail', {idUser: req.session.idUser,user: req.session.user, footer: true, navHeader: true, detailMovies: results, cinemas:  result1});
		  })
        });
    },
};
