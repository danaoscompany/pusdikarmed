$(document).ready(function() {
	let adminID = parseInt($("#admin-id").val());
	let fd = new FormData();
	fd.append("id", adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_by_id",
		data: fd,
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

function addAdmin() {
	let name = $("#name").val().trim();
	let email = $("#email").val().trim();
	let password = $("#password").val().trim();
	if (name == "" || email == "" || password == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("name", name);
	fd.append("email", email);
	fd.append("password", password);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_admin",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			var responseCode = parseInt(obj['response_code']);
			if (responseCode == -1) {
				alert("Email sudah digunakan");
			} else {
				window.location.href = ".";
			}
		}
	});
}

function cancelAdding() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
		window.history.back();
	}
}
