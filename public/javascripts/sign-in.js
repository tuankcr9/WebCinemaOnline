const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container_signup_signin');

function signUpValidateForm() {
	var x = document.forms["sign-up-form"]["sign-up-name"].value;
	if (x == "") {
		//   alert("'Name' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Name' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-up-form"]["sign-up-email"].value;
	if (x == "") {
		//   alert("'Email' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'E-mail' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-up-form"]["sign-up-passwd"].value;
	if (x == "") {
		//   alert("'Password' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Password' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
}

function signInValidateForm() {

	x = document.forms["sign-in-form"]["sign-in-email"].value;
	if (x == "") {
		//   alert("'Email' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'E-mail' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-in-form"]["sign-in-passwd"].value;
	if (x == "") {
		//   alert("'Password' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Password' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
}

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

$(window).on("scroll", function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 80) {
		$("#site-header").addClass("nav-fixed");
	} else {
		$("#site-header").removeClass("nav-fixed");
	}
});

//Main navigation Active Class Add Remove
$(".navbar-toggler").on("click", function () {
	$("header").toggleClass("active");
});
$(document).on("ready", function () {
	if ($(window).width() > 991) {
		$("header").removeClass("active");
	}
	$(window).on("resize", function () {
		if ($(window).width() > 991) {
			$("header").removeClass("active");
		}
	});
});