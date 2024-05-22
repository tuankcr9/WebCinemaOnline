var connection = require("../utils/connectDB");
const moment = require("moment");

module.exports = {
	home: function (req, res) {
		// const sql =
		// 	"SELECT c.cinema_name, c.cinema_address, COUNT(DISTINCT r.room_id) AS num_rooms, SUM(CASE WHEN s.seat_type = 'Thường' THEN 1 ELSE 0 END) AS num_regular_seats, SUM(CASE WHEN s.seat_type = 'VIP' THEN 1 ELSE 0 END) AS num_vip_seats, COUNT(DISTINCT sc.movie_id) AS num_movies FROM cinemas c LEFT JOIN room r ON c.cinema_id = r.cinema_id LEFT JOIN seats s ON r.room_id = s.room_id LEFT JOIN schedule sc ON r.room_id = sc.room_id GROUP BY c.cinema_id;";
		const sql =
			"SELECT c.cinema_name, c.cinema_address, COUNT(DISTINCT r.room_id) AS number_of_rooms, SUM(CASE WHEN s.seat_type = 'Thường' THEN 1 ELSE 0 END) AS number_of_regular_seats, SUM(CASE WHEN s.seat_type = 'VIP' THEN 1 ELSE 0 END) AS number_of_vip_seats, m.movie_name, m.movie_lenght, sc.schedule_date, sc.schedule_start, sc.schedule_end FROM cinemas c JOIN room r ON c.cinema_id = r.cinema_id JOIN seats s ON r.room_id = s.room_id JOIN schedule sc ON r.room_id = sc.room_id JOIN movies m ON sc.movie_id = m.movie_id GROUP BY c.cinema_id, m.movie_id, sc.schedule_start, sc.schedule_end;";
		connection.query(sql, (error, result) => {
			if (error) {
				throw error;
			} else {
				// Định dạng lại ngày
				result.forEach((item) => {
					item.schedule_date = moment(item.schedule_date).format("dddd DD-MM-YYYY");
				});
				res.render("admin/index", { layout: "/admin/admin_layout", result: result, title: "Trang chủ" });
			}
		});
	},

	getMovies: function (req, res) {
		const tickets = "SELECT * FROM movies";
		connection.query(tickets, (error, result) => {
			if (error) {
				throw error;
			} else {
				res.render("admin/movies", { layout: "/admin/admin_layout", movies: result, title: "Quản lí phim" });
			}
		});
	},

	getUserInfo: function (req, res) {
		const sql = "Select * from users ";
		connection.query(sql, (error, result) => {
			if (error) throw error;
			res.render("admin/user_info", { layout: "/admin/admin_layout", userInfo: result, title: "Thông tin người dùng" });
		});
	},

	createMovies: function (req, res) {
		res.render("admin/create_movies", { layout: "/admin/admin_layout", title: "Thêm phim mới" });
	},

	storeMovies: function (req, res) {
		const { movieName, movieDescription, movieTrailer, movieCens, movieGenres, movieRelease, movieStatus, movieLenght, movieFormat, moviePoster } = req.body;
		const sql =
			"INSERT INTO movies (movie_name, movie_description, movie_trailer, movie_cens, movie_genres, movie_release, movie_status, movie_lenght, movie_format, movie_poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		connection.query(sql, [movieName, movieDescription, movieTrailer, movieCens, movieGenres, movieRelease, movieStatus, movieLenght, movieFormat, moviePoster], (err, result) => {
			if (err) throw err;
			console.log(result);
			const message = "Thêm phim mới thành công";
			res.render("admin/create_movies", { layout: "/admin/admin_layout", message: message, title: "Thêm phim mới", redirect: "/admin/movies" });
		});
	},

	editMovies: function (req, res) {
		const idMovies = req.query.id;
		const sql = "Select * from movies where movie_id = " + idMovies;
		connection.query(sql, (error, result) => {
			if (error) throw error;
			console.log(result);
			res.render("admin/edit_movies", { layout: "/admin/admin_layout", movies: result, title: "Chỉnh sửa phim" });
		});
	},

	confirmEditMovies: function (req, res) {
		const { movieId, movieName, movieDescription, movieTrailer, movieCens, movieGenres, movieRelease, movieStatus, movieLenght, movieFormat, moviePoster } = req.body;
		const idMovies = req.body.movieId;
		const sql =
			"UPDATE movies SET movie_name = ?, movie_description = ?, movie_trailer = ?, movie_cens = ?, movie_genres = ?, movie_release = ?, movie_status = ?, movie_lenght = ?, movie_format = ?, movie_poster = ? WHERE movie_id = ?";
		connection.query(sql, [movieName, movieDescription, movieTrailer, movieCens, movieGenres, movieRelease, movieStatus, movieLenght, movieFormat, moviePoster, movieId], (err, result) => {
			if (err) throw err;
			console.log(result);
			const message = "Cập nhật thông tin phim thành công";
			// res.render("admin/edit_movies", { layout: "/admin/admin_layout", message: message, title: "Chỉnh sửa phim", redirect: "/admin/movies" });
			res.redirect("/admin/edit_movies?id=" + idMovies);
			// res.render("admin/edit_movies", { layout: "/admin/admin_layout", message: message, title: "Chỉnh sửa phim", redirect: "/admin/movies" });
		});
	},

	deleteMovies: function (req, res) {
		const idMovies = req.query.id;
		console.log(idMovies);
		const sql = "delete from movies where movie_id = " + idMovies;
		connection.query(sql, (error, result) => {
			if (error) throw error;
			res.redirect("/admin/movies");
		});
	},

	getCinemas: function (req, res) {
		// const sql = "Select * from cinemas";
		const sql =
			"SELECT @row_number:=@row_number+1 AS stt, c.cinema_id, c.cinema_name, c.cinema_address, COUNT(r.room_id) AS num_room FROM cinemas c LEFT JOIN room r ON c.cinema_id = r.cinema_id CROSS JOIN (SELECT @row_number:=0) AS t GROUP BY c.cinema_id ORDER BY c.cinema_id ASC;";
		connection.query(sql, (error, result) => {
			if (error) throw error;
			res.render("admin/cinemas", { layout: "/admin/admin_layout", cinemas: result, title: "Quản lí rạp phim" });
		});
	},

	getRoom: function (req, res) {
		const sql =
			"SELECT @rownum := @rownum + 1 AS stt, r.room_id, r.room_name, c.cinema_name AS room_cinema, c.cinema_address AS room_address FROM room r JOIN cinemas c ON r.cinema_id = c.cinema_id JOIN (SELECT @rownum := 0) r";
		connection.query(sql, (error, result) => {
			if (error) throw error;
			res.render("admin/room", { layout: "/admin/admin_layout", room: result, title: "Quản lí phòng chiếu" });
		});
	},

	getSchedule: function (req, res) {
		const sql =
			"SELECT ROW_NUMBER() OVER(ORDER BY s.schedule_date, s.schedule_start) AS stt, s.schedule_id, m.movie_name, r.room_name, c.cinema_name, c.cinema_address, s.schedule_start, s.schedule_end, s.schedule_date FROM schedule s JOIN movies m ON s.movie_id = m.movie_id JOIN room r ON s.room_id = r.room_id JOIN cinemas c ON r.cinema_id = c.cinema_id;";
		connection.query(sql, (error, result) => {
			if (error) throw error;
			result.forEach((item) => {
				item.schedule_date = moment(item.schedule_date).format("dddd DD-MM-YYYY");
			});
			res.render("admin/schedule", { layout: "admin/admin_layout", schedule: result, title: "Quản lí lịch chiếu phim" });
		});
	},

	getTickets: function (req, res) {
		const sql =
			"SELECT ROW_NUMBER() OVER (ORDER BY booking_id) AS stt, users.user_fullname, users.user_phone, movies.movie_name, schedule.schedule_date, schedule.schedule_start, schedule.schedule_end, cinemas.cinema_name, cinemas.cinema_address, booking.seat_name, booking_id, r.room_name FROM booking INNER JOIN users ON booking.user_id = users.user_id INNER JOIN schedule ON booking.schedule_id = schedule.schedule_id INNER JOIN movies ON schedule.movie_id = movies.movie_id INNER JOIN room ON schedule.room_id = room.room_id INNER JOIN cinemas ON room.cinema_id = cinemas.cinema_id INNER JOIN room r ON schedule.room_id = r.room_id;";

		connection.query(sql, (error, result) => {
			if (error) throw error;
			result.forEach((item) => {
				item.schedule_date = moment(item.schedule_date).format("dddd DD-MM-YYYY");
			});
			res.render("admin/tickets", { layout: "admin/admin_layout", booking: result, title: "Quản lí vé xem phim" });
		});
	},
};
