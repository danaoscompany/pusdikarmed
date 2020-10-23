var sessionUUID = "";
var users = [];
var patients = [];

$(document).ready(function() {
	sessionUUID = $("#session-uuid").val().trim();
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
			getPatients();
		}
	});
}

function getPatients() {
	patients = [];
	$("#patients").find("*").remove();
	$("#patients").append("<option>Pilih Pasien</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/patients/get",
		dataType: 'text',
		cache: false,
		success: function(response) {
			patients = JSON.parse(response);
			for (let i=0; i<patients.length; i++) {
				var patient = patients[i];
				$("#patients").append("<option>"+patient['name']+"</option>");
			}
			getSessionInfo();
		}
	});
}

function getSessionInfo() {
	let fd = new FormData();
	fd.append("uuid", sessionUUID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/sessions/get_by_uuid",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			var selectedUserIndex = 0;
			for (let i=0; i<users.length; i++) {
				var user = users[i];
				if (parseInt(user['id']) == parseInt(obj['user_id'])) {
					selectedUserIndex = i;
					break;
				}
			}
			var selectedPatientIndex = 0;
			for (let i=0; i<patients.length; i++) {
				var patient = patients[i];
				if (parseInt(patient['id']) == parseInt(obj['user_id'])) {
					selectedPatientIndex = i;
					break;
				}
			}
			$("#users option:eq("+(selectedUserIndex+1)+")").prop('selected', true);
			$("#patients option:eq("+(selectedPatientIndex+1)+")").prop('selected', true);
			$("#name").val(obj['name']);
			$("#date").val(moment(obj['date']).format('YYYY-MM-DD'));
			$("#time").val(moment(obj['date']).format('HH:mm:ss'));
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
	fd.append('uuid', sessionUUID);
	fd.append('name', name);
	fd.append('user_id', users[userIndex]['id']);
	fd.append('patient_uuid', patients[patientIndex]['uuid']);
	fd.append('date', date);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/sessions/update_session",
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
