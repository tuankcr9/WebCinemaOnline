const { updateLocale } = require('moment')
var connection = require('../utils/connectDB')

module.exports = {
    showBooking: function (req, res) {
        if(req.session.user == null){
            return res.redirect("/login")
        }
        console.log(req.body)
        var sql1 = `select * from schedule s, room r where movie_id = '${req.body.movie}' and cinema_id = '${req.body.cinema}' and s.room_id = r.room_id `
        connection.query(sql1, function (err, result1) {
            console.log(result1)
            if (err) throw err
            //lấy dữ liệu từ bảng combo_popcorn để hiển thị
            var sql2 = "select * from combo_popcorn";
            connection.query(sql2, function (err, result2) {
                if (err) throw err;
                return res.render('booking', {idUser: req.session.idUser,user: req.session.user, title: "Booking ticket", times: result1, combos: result2, movieId: req.body.movie, movieName: req.body.movie_name, idUser: req.body.user_id,navHeader: true});
            })
        })
    },

    getSeat: function (req, res) {
        var sql = "select * from seats where room_id = 1"
        connection.query(sql, function (err, result) {
            if (err) throw err
            return res.json(result)
        })
    },

    getSelectTime: function (req, res) {
        console.log()
        return res.json(true)
    },

    selectSeat: function (req, res) {
        res.render('selectSeat')
    },

    getPayment: function (req, res) {
        res.render('payment')
    },

    postTicket: function (req, res) {
        console.log(req.body)
        var sql = `select * from schedule where schedule_start = '${req.body.time}' and movie_id = ${req.body.movieId}`
        connection.query(sql, function(err, result){
            if(err) throw err
            console.log(result)
            sql = `INSERT INTO booking values (null,'${req.body.userId}','${result[0].schedule_id}','${req.body.seats}','${req.body.total}','${req.body.combos}','0')`
            connection.query(sql,function(err,result1){
                if(err) throw err
                console.log("Number of records inserted: " + result1.affectedRows)
                req.flash("room", [req.body.room])
                return res.redirect("/booking/eticket/" + result1.insertId)
            })
        })
    },

    getTicket: function(req, res){
        if(req.params.ticket == "" || req.params.ticket == null){
            return res.redirect("/")
        }else if(req.session.user == null){
            return res.redirect("/login")
        }
        var sql = `select room_name, seat_name, price, schedule_date, schedule_start, movie_name, movie_poster, combo_name from booking b,schedule s, movies m, room r where booking_id = '${req.params.ticket}' and s.schedule_id = b.schedule_id and s.movie_id = m.movie_id and s.room_id = r.room_id`
        connection.query(sql, function(err,result){
            if(err) throw err
            if(result.length > 0){
                console.log(result[0])
                console.log(req.flash("room"))
                return res.render('e-ticket', {idUser: req.session.idUser,user: req.session.user, title: "Vé xem phim", ticket: result[0], navHeader: true})
            }
        })
    }
}