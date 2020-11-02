$(document).ready(function() {
});

function login() {
	let fd = new FormData();
	let email = $("#email").val().trim();
	let password = $("#password").val();
	if (email == "" || password == "") {
		alert("Mohon masukkan email dan kata sandi");
		return;
	}
	fd.append("email", email);
	fd.append("password", password);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/login",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			let obj = JSON.parse(response);
			var responseCode = parseInt(obj['response_code']);
			if (responseCode == 1) {
				window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/admin/user";
			} else if (responseCode == -1) {
				alert("The email or password you entered is incorrect.");
			} else if (responseCode == -2) {
				alert("The email or password you entered is incorrect.");
			}
		}
	});
}
