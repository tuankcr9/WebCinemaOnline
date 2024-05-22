var connection = require("../utils/connectDB");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const validator = require("validator");

//chỉnh sửa từ đây
module.exports = {
	//trang tạo mật khẩu mới
	recovery: function (req, res) {
		const error = req.flash("error");
		res.render("passwordRecovery", { error, title: "rePassword", layout: false });
	},

	rePassword: function (req, res) {
		let result = validationResult(req);
		if (result.errors.length === 0) {
			const { name, email, phone, password, repassword } = req.body;

			const sql = "SELECT * FROM users WHERE username = ? and user_email = ? and user_phone = ?";
			const params = [name, email, phone];

			connection.query(sql, params, (err, result, fields) => {
				if (err) {
					req.flash("error", err.message);
					return res.redirect("/recovery");
				} else if (result.length === 0) {
					req.flash("error", "Email, số điện thoại hoặc tên đăng ký không chính xác");
					return res.redirect("/recovery");
				} else {
					//tạo mật khẩu mới
					const hased = bcrypt.hashSync(password, 10);
					const sql = `UPDATE users SET password = '${hased}' WHERE user_phone = '${phone}'`;
					connection.query(sql, function (err, result) {
						if (err) {
							req.flash("error", "Cập nhật mật khẩu không thành công");
							return res.redirect("/recovery");
						}
						return res.redirect("/login");
					});
				}
			});
		} else {
			result = result.mapped();

			let message;
			for (fields in result) {
				message = result[fields].msg;
				break;
			}

			req.flash("error", message);
			return res.redirect("/recovery");
		}
	},

	// chức năng đăng xuất
	logout: function (req, res) {
		req.session.destroy();
		res.redirect("/login");
	},

	//Trang đăng nhập
	login: function (req, res) {
		if (req.session.user) {
			return res.redirect("/");
		}
		const error = req.flash("error");
		const email = req.flash("email");
		res.render("login", { error, email, title: "Login", layout: false });
	},
	//Trang đăng ký
	register: function (req, res) {
		const error = req.flash("error");
		const name = req.flash("name");
		const email = req.flash("email");
		const date = req.flash("date");
		const phone = req.flash("phone");
		res.render("register", { error, name, email, date, phone, title: "Register", layout: false });
	},

	//kiểm tra đăng nhập

	loginUser: function (req, res) {
		let result = validationResult(req);
		if (result.errors.length === 0) {
			const { email, password } = req.body;

			const sql = "SELECT * FROM users WHERE user_email = ?";
			const params = [email];

			connection.query(sql, params, (err, result, fields) => {
				if (err) {
					req.flash("error", err.message);
					req.flash("password", password);
					req.flash("email", email);
					return res.redirect("/login");
				} else if (result.length === 0) {
					req.flash("error", "Email không tồn tại");
					req.flash("password", password);
					req.flash("email", email);
					return res.redirect("/login");
				} else {
					//login khach hang
					if (result[0].role != 1) {
						const hased = result[0].password;
						const match = bcrypt.compareSync(password, hased);
						if (!match) {
							req.flash("error", "Mật khẩu không chính xác");
							req.flash("password", password);
							req.flash("email", email);
							return res.redirect("/login");
						} else {
							let user = result[0].username;
							req.session.user = user;
							req.session.idUser = result[0].user_id;
							return res.redirect("/");
						}
					} else {
						//login admin
						if (result[0].password == password) {
							let user = result[0].username;
							req.session.user = user;
							req.session.idUser = result[0].user_id;
							return res.redirect("/admin");
						}
						req.flash("error", "Mật khẩu không chính xác");
						req.flash("password", password);
						req.flash("email", email);
						return res.redirect("/login");
					}
				}
			});
		} else {
			result = result.mapped();

			let message;
			for (fields in result) {
				message = result[fields].msg;
				break;
			}

			const { email, password } = req.body;

			req.flash("error", message);
			req.flash("password", password);
			req.flash("email", email);

			return res.redirect("/login");
		}
	},

	//kiểm tra đăng ký
	registerUser: function (req, res) {
		let result = validationResult(req);
		if (result.errors.length === 0) {
			const { name, email, password, date, phone } = req.body;

			const hased = bcrypt.hashSync(password, 10);

			const sql = "insert into users(username, user_email, password, user_phone, user_birthday) values(?,?,?,?,?)";
			const params = [name, email, hased, phone, date];

			connection.query(sql, params, (err, result, fields) => {
				if (err) {
					req.flash("error", err.message);
					req.flash("name", name);
					req.flash("email", email);
					req.flash("date", date);
					req.flash("phone", phone);

					return res.redirect("/register");
				} else if (result.affectedRows === 1) {
					return res.redirect("/login");
				} else {
					req.flash("error", "Đăng ký thất bại");
					req.flash("name", name);
					req.flash("email", email);
					req.flash("date", date);
					req.flash("phone", phone);
					return res.redirect("/register");
				}
			});
		} else {
			result = result.mapped();

			let message;
			for (fields in result) {
				message = result[fields].msg;
				break;
			}

			const { name, email, password, date, phone } = req.body;
			req.flash("error", message);
			req.flash("name", name);
			req.flash("email", email);
			req.flash("date", date);
			req.flash("phone", phone);
			return res.redirect("/register");
		}
	},

	//trang thông tin người dùng
	homeUser: function (req, res) {
		if (req.session.user == null) {
			return res.redirect("/login");
		}
		var sql = `Select * from users where user_id = ${req.params.id}`;
		connection.query(sql, function (err, result) {
			if (err) throw err;
			if (result) {
				console.log(JSON.parse(JSON.stringify(result)));
				return res.render("user", {
					idUser: req.session.idUser,user: req.session.user,
					navHeader: true,
					userInfo: JSON.parse(JSON.stringify(result))[0],
					error: req.flash("error"),
					success: req.flash("success"),
				});
			}
		});
	},
	editUser: function (req, res) {
		let result = validationResult(req);
		if (result.errors.length === 0) {
			var sql = `UPDATE users SET user_fullname = '${req.body.fullname}', user_phone = '${req.body.phone}', user_birthday = '${req.body.birthday}', user_gender = '${req.body.gender}' WHERE user_id = '${req.body.user_id}'`;
			connection.query(sql, function (err, result) {
				if (err) {
					req.flash("error", ["Cập nhật thông tin không thành công"]);
					return res.redirect(`/user/${req.body.user_id}`);
				}
				console.log(result.affectedRows + " record(s) updated");
				req.flash("success", ["Cập nhật thông tin thành công"]);
				return res.redirect(`/user/${req.body.user_id}`);
			});
		} else {
			req.flash("error", ["Cập nhật thông tin không thành công"]);
			return res.redirect(`/user/${req.body.user_id}`);
		}
	},

	getOrderedTicket: function (req, res) {
		if (req.session.user == null) {
			return res.redirect("/login");
		}
		console.log(req.params.id);
		var sql = `select booking_id, room_name, seat_name, price, schedule_date, schedule_start, movie_name, movie_poster, combo_name from booking b,schedule s, movies m, room r where user_id = '${req.params.id}' and s.schedule_id = b.schedule_id and s.movie_id = m.movie_id and s.room_id = r.room_id`;
		connection.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result);
			return res.render("orderedTicket", { idUser: req.session.idUser, user: req.session.user, title: "Lịch sử đặt vé", ordered: result, navHeader: true });
		});
	},
};
