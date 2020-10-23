var userID = 0;
var prevEmail = "";
var prevPhone = "";

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
	let fd = new FormData();
	fd.append("id", userID);
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
			prevPhone = user['phone'];
			$("#email").val(prevEmail);
			$("#password").val(user['password']);
			$("#name").val(user['name']);
			$("#phone").val(prevPhone);
			$("#birthday").val(user['birthday']);
			var role = user['role'];
			if (role == "customer") {
				$("#positions").prop('selectedIndex', 1);
			} else if (role == "store") {
				$("#positions").prop('selectedIndex', 2);
			} else if (role == "owner") {
				$("#positions").prop('selectedIndex', 3);
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
	let password = $("#password").val().trim();
	let name = $("#name").val().trim();
	let phone = $("#phone").val().trim();
	let birthday = $("#birthday").val().trim();
	let position = parseInt($("#positions").prop('selectedIndex'));
	if (email == "" || password == "" || name == "" || phone == "" || birthday == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let role = "customer";
	if (position == 2) {
		role = "store";
	} else if (position == 3) {
		role = "owner";
	}
	let fd = new FormData();
	fd.append("id", userID);
	fd.append("email", email);
	fd.append("password", password);
	fd.append("name", name);
	fd.append("role", role);
	fd.append("phone", phone);
	fd.append("birthday", birthday);
	if (prevEmail != email) {
		fd.append("email_changed", 1);
	} else {
		fd.append("email_changed", 0);
	}
	if (prevPhone != phone) {
		fd.append("phone_changed", 1);
	} else {
		fd.append("phone_changed", 0);
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
