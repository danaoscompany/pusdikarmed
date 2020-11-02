var uuid = "";
var userID = 0;

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
	uuid = $("#uuid").val().trim();
	let fd = new FormData();
	fd.append("cmd", "SELECT * FROM `devices` WHERE `uuid`='"+uuid+"'");
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/main/query",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var deviceInfo = JSON.parse(response)[0];
			$("#device").val(deviceInfo['device']);
			$("#model").val(deviceInfo['model']);
			$("#type").val(deviceInfo['type']);
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
	var device = $("#device").val().trim();
	var model = $("#model").val().trim();
	var type = $("#type").val().trim();
	if (device == "" || model == "" || type == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("uuid", uuid);
	fd.append("device", device);
	fd.append("model", model);
	fd.append("type", type);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/devices/edit_device",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/devices", {
				id: userID
			});
		}
	});
}

function cancelEditing() {
	window.history.back();
}
