var users = [];
var patients = [];
var selectedPatientIndex = 0;
var userID = 0;
var userUUID = "";

$(document).ready(function() {
	userID = parseInt($("#user-id").val());
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
			userUUID = JSON.parse(response)['uuid'];
			getUsers();
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

function getUsers() {
	users = [];
	$("#select-user").find("*").remove();
	$("#select-user").append("<option>--- Choose User ---</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_all_users",
		dataType: 'text',
		cache: false,
		success: function(response) {
			users = JSON.parse(response);
			var selectedIndex = 0;
			for (var i=0; i<users.length; i++) {
				var user = users[i];
				var uuid = user['uuid'];
				console.log("userUUID: "+userUUID+", uuid: "+uuid);
				if (userUUID != null && userUUID != "" && userUUID == uuid) {
					selectedIndex = i+1;
				}
				$("#select-user").append("<option id='"+user['uuid']+"'>"+user['first_name']+" "+user['last_name']+"</option>");
			}
			if (users.length > 0) {
				$("#select-user").on('change', function() {
					var id = $(this).children(":selected").attr('id');

				});
				$("#select-user option").eq(selectedIndex).attr("selected", true);
				getPatients(parseInt(users[0]['id']));
			}
		}
	});
}

function getPatients(id) {
	if (userID != 0) {
		id = userID;
	}
	userID = id;
	$("#patients").find("*").remove();
	let fd = new FormData();
	fd.append("cmd", "SELECT * FROM `patients` WHERE `user_id`="+userID+" ORDER BY `name`");
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/main/query',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			patients = JSON.parse(response);
			for (let i=0; i<patients.length; i++) {
				let patient = patients[i];
				$("#patients").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+patient['name']+"</td>" +
					"                                        <td>"+patient['address']+"</td>" +
					"                                        <td>"+patient['city']+"</td>" +
					"                                        <td>"+patient['province']+"</td>" +
					"                                        <td>"+patient['birthday']+"</td>" +
					"                                        <td><button onclick='viewImages("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>View</button></td>" +
					"                                        <td><button onclick='editPatient("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeletePatient("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function viewImages(index) {
	window.location.href = "http://batterynusantara.com/image";
}

function viewDevices(index) {
	window.location.href = "http://batterynusantara.com/devices?id="+patients[index]['id'];
}

function viewPatients(index) {
	window.location.href = "http://batterynusantara.com/patients?id="+patients[index]['id'];
}

function editPatient(index) {
	$.redirect("http://batterynusantara.com/patients/edit", {
		'id': parseInt(patients[index]['id']),
		'uuid': patients[index]['uuid'],
		'user_id': parseInt(patients[index]['user_id'])
	});
}

function confirmDeletePatient(index) {
	selectedPatientIndex = index;
	$("#confirmLabel").html("Delete User");
	$("#confirmBody").html("Are you sure you want to delete this user?");
	$("#confirm").modal('show');
}

function deletePatient() {
	var id = patients[selectedPatientIndex]['id'];
	let fd = new FormData();
	fd.append("cmd", "DELETE FROM `patients` WHERE `id`="+id);
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/main/execute',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			getPatients();
		}
	});
}

function logout() {
	$("#confirmLabel").html("Konfirmasi Log Out");
	$("#confirm-message").html("Apakah Anda yakin ingin keluar?");
	$("#confirm-yes").on("click", function() {
		window.location.href = PHP_URL+"/admin/logout";
	});
}
