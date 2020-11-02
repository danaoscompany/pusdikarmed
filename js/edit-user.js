var userID = 0;
var prevEmail = "";

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
	let fd = new FormData();
	fd.append("id", userID);
	fd.append("date", moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_user_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var user = JSON.parse(response);
			prevEmail = user['email'];
			$("#email").val(prevEmail);
			$("#first-name").val(user['first_name']);
			$("#last-name").val(user['last_name']);
			var role = user['role'];
			if (role == "admin") {
				$("#role").prop('selectedIndex', 1);
			}
		}
	});
	var adminID = parseInt($("#admin-id").val().trim());
	let fd2 = new FormData();
	fd2.append("id", adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_by_id",
		data: fd2,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			$("#admin-name").html(obj['name']);
			$("#admin-email").html(obj['email']);
		}
	});
});

function save() {
	let email = $("#email").val().trim();
	let firstName = $("#first-name").val().trim();
	let lastName = $("#last-name").val().trim();
	let role = parseInt($("#role").prop('selectedIndex'));
	if (email == "" || firstName == "" || lastName == "" || role == 0) {
		alert("Mohon lengkapi data");
		return;
	}
	if (role == 1) {
		role = "admin";
	}
	let fd = new FormData();
	fd.append("id", userID);
	fd.append("email", email);
	fd.append("first_name", firstName);
	fd.append("last_name", lastName);
	fd.append("role", role);
	if (prevEmail != email) {
		fd.append("email_changed", 1);
	} else {
		fd.append("email_changed", 0);
	}
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_user",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			var responseCode = parseInt(obj['response_code']);
			if (responseCode == -1) {
				alert("Email sudah digunakan");
			} else if (responseCode == -2) {
				alert("Nomor HP sudah digunakan");
			} else {
				window.history.back();
			}
		}
	});
}

function cancelEditing() {
	window.history.back();
}
