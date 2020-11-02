var userID = 0;
var devices = [];
var selectedDeviceIndex = 0;

$(document).ready(function () {
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
	getDevices();
});

function getDevices() {
	devices = [];
	$("#devices").find("*").remove();
	let fd = new FormData();
	fd.append("user_id", userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL + "/devices/get_by_user_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function (response) {
			devices = JSON.parse(response);
			for (var i = 0; i < devices.length; i++) {
				var device = devices[i];
				$("#devices").append("<tr>" +
					"                                        <th scope=\"row\">" + (i + 1) + "</th>" +
					"                                        <td>" + device['device'] + "</td>" +
					"                                        <td>" + device['model'] + "</td>" +
					"                                        <td>" + device['type'] + "</td>" +
					"                                        <td><button onclick='editDevice(" + i + ")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteDevice(" + i + ")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editDevice(index) {
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/devices/edit", {
		'uuid': devices[index]['uuid'],
		'id': devices[index]['user_id']
	});
}

function confirmDeleteDevice(index) {
	selectedDeviceIndex = index;
	$("#confirmLabel").html("Delete Device");
	$("#confirmBody").html("Are you sure you want to delete this device?");
	$("#confirm").modal('show');
}

function deleteDevice() {
	var uuid = devices[selectedDeviceIndex]['uuid'];
	let fd = new FormData();
	fd.append("uuid", uuid);
	$.ajax({
		type: 'POST',
		url: PHP_URL + '/devices/delete',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function (response) {
			getDevices();
		}
	});
}

function addDevice() {
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/devices/add", {
		id: userID
	});
}
