var users = [];
var patients = [];

$(document).ready(function() {
	getUsers();
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

function getUsers() {
	users = [];
	$("#users").find("*").remove();
	$("#users").append("<option>--- Choose User ---</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/user/get",
		dataType: 'text',
		cache: false,
		success: function(response) {
			users = JSON.parse(response);
			for (let i=0; i<users.length; i++) {
				var user = users[i];
				$("#users").append("<option>"+user['first_name']+" "+user['last_name']+"</option>");
			}
			$("#patients").append("<option>--- Pilih Pasien ---</option>");
			$("#users").on("change", function() {
				var selectedUserIndex = $("#users").prop('selectedIndex');
				if (selectedUserIndex > 0) {
					selectedUserIndex--;
					getPatients(parseInt(users[selectedUserIndex]['id']));
				} else {
					$("#patients").find("*").remove();
				}
			});
		}
	});
}

function getPatients(userID) {
	patients = [];
	let fd = new FormData();
	fd.append("user_id", userID);
	$("#patients").find("*").remove();
	$("#patients").append("<option>--- Pilih Pasien ---</option>");
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/patients/get_by_user_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			patients = JSON.parse(response);
			for (let i=0; i<patients.length; i++) {
				var patient = patients[i];
				$("#patients").append("<option>"+patient['name']+"</option>");
			}
			$("#patients").append("<option>--- Tambah Pasien ---</option>");
			$("#patients").on("change", function() {
				var selectedPatientIndex = $("#patients").prop('selectedIndex');
				if (selectedPatientIndex > 0) {
					if (selectedPatientIndex == patients.length+1) {
						var selectedUserIndex = $("#users").prop('selectedIndex');
						if (selectedUserIndex > 0) {
							selectedUserIndex--;
							$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/patients/add", {
								'id': users[selectedUserIndex]['id']
							});
						}
					}
				}
			});
		}
	});
}

function save() {
	let name = $("#name").val().trim();
	let userIndex = $("#users").prop('selectedIndex');
	let patientIndex = $("#patients").prop('selectedIndex');
	if (name == "" || userIndex == 0 || patientIndex == 0) {
		alert("Please complete data");
		return;
	}
	userIndex--;
	patientIndex--;
	let date = $("#date").val().trim()+" "+$("#time").val().trim();
	let fd = new FormData();
	fd.append("uuid", uuidv4());
	fd.append('name', name);
	fd.append('user_id', users[userIndex]['id']);
	fd.append('patient_uuid', patients[patientIndex]['uuid']);
	fd.append('date', date);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/sessions/add_session",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}

function cancelEditing() {
	window.history.back();
}
