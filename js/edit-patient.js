var userID = 0;
var patientID = 0;
var uuid = "";

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
	patientID = parseInt($("#patient-id").val().trim());
	uuid = $("#patient-uuid").val().trim();
	let fd = new FormData();
	fd.append("uuid", uuid);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/patients/get_by_uuid",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			$("#name").val(obj['name']);
			$("#address").val(obj['address']);
			$("#city").val(obj['city']);
			$("#province").val(obj['province']);
			$("#birthday").val(obj['birthday']);
		}
	});
	var adminID = parseInt($("#admin-id").val());
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
	var name = $("#name").val().trim();
	var address = $("#address").val().trim();
	var city = $("#city").val().trim();
	var province = $("#province").val().trim();
	var birthday = $("#birthday").val().trim();
	if (name == "" || address == "" || city == "" || province == "" || birthday == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("uuid", uuid);
	fd.append("name", name);
	fd.append("address", address);
	fd.append("city", city);
	fd.append("province", province);
	fd.append("birthday", birthday);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/patients/edit_patient",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/patients", {
				'id': userID
			});
		}
	});
}

function cancelEditing() {
	window.history.back();
}
