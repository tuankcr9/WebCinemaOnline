var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
var homeRouter = require("./routes/homeRouter");
var userRouter = require("./routes/userRouter");
var adminRouter = require("./routes/adminRouter");
var hbs = require("hbs");
var bookingRouter = require("./routes/bookingRouter");
const bodyParser = require("body-parser");
var passport = require("passport");
var configFB = require("./configuration/configFB");
var configGG = require("./configuration/configGG");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("admin_layout", "/admin/admin_layout.hbs");

hbs.registerHelper("chooseGender", function (gender, options) {
	if (gender === "1") {
		console.log(gender === "1");
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(
	session({
		secret: "secret",
		saveUninitialized: false,
		resave: false,
	})
);

app.use("/booking", bookingRouter);
app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);

//login by fb,gg
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

passport.use(
	new FacebookStrategy(
		{
			clientID: configFB.facebook_key,
			clientSecret: configFB.facebook_secret,
			callbackURL: configFB.callback_url,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, { profile: profile, accessToken: accessToken });
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: configGG.google_key,
			clientSecret: configGG.google_secret,
			callbackURL: configGG.callback_url,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, { profile: profile, accessToken: accessToken });
		}
	)
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(8080, () => {
	console.log("http://localhost:8080");
})

module.exports = app;
