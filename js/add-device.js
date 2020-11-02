var userID = 0;

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
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

function addDevice() {
	var device = $("#device").val().trim();
	var model = $("#model").val().trim();
	var type = $("#type").val().trim();
	if (device == "" || model == "" || type == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("user_id", userID);
	fd.append("uuid", uuidv4());
	fd.append("device", device);
	fd.append("model", model);
	fd.append("type", type);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/devices/add_device",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/devices", {
				id: userID
			});
		}
	});
}

function cancelAdding() {
	window.history.back();
}
