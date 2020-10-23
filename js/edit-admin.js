var editedAdminID = 0;
var emailChanged = 0;
var prevEmail = "";

$(document).ready(function() {
	editedAdminID = parseInt($("#edited-admin-id").val());
	let fd = new FormData();
	fd.append("id", editedAdminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_admin_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			prevEmail = obj['email'];
			$("#name").val(obj['name']);
			$("#email").val(obj['email']);
			$("#password").val(obj['password']);
			$("#roles").prop('selectedIndex', parseInt(obj['role'])-1);
		}
	});
	let adminID = parseInt($("#admin-id").val());
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
	let name = $("#name").val().trim();
	let email = $("#email").val().trim();
	let password = $("#password").val().trim();
	let role = parseInt($("#roles").prop('selectedIndex'))+1;
	if (email == "" || password == "") {
		alert("Mohon lengkapi data");
		return;
	}
	if (email != prevEmail) {
		emailChanged = 1;
	}
	let fd = new FormData();
	fd.append("id", editedAdminID);
	fd.append("name", name);
	fd.append("email", email);
	fd.append("password", password);
	fd.append("role", role);
	fd.append("email_changed", emailChanged);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_admin",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			var responseCode = parseInt(obj['response_code']);
			if (responseCode == 1) {
				window.location.href = "http://batterynusantara.com/admin";
			}
		}
	});
}

function cancelEditing() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
		window.history.back();
	}
}
