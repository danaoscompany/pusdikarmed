const HOST = "pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed";
const PHP_URL = "http://"+HOST+"/index.php";

$(document).ready(function() {
	let userID = parseInt($("#admin-id").val());
	let fd = new FormData();
	fd.append("id", userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_admin_by_id",
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

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function logout() {
	if (confirm("Apakah Anda yakin ingin keluar?")) {
		window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/logout";
	}
}
