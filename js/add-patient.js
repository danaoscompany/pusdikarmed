var userID = 0;

$(document).ready(function() {
	userID = parseInt($("#user-id").val().trim());
});

function addPatient() {
	var name = $("#name").val().trim();
	var address = $("#address").val().trim();
	var city = $("#city").val().trim();
	var province = $("#province").val().trim();
	var birthday = $("#birthday").val().trim();
	var email = $("#email").val().trim();
	var phone = $("#phone").val().trim();
	var genderIndex = $("#gender").prop('selectedIndex');
	if (name == "" || address == "" || city == "" || province == "" || birthday == "") {
		alert("Mohon lengkapi data");
		return;
	}
	var gender = 'L';
	if (genderIndex == 1) {
		gender = 'P';
	}
	let fd = new FormData();
	fd.append("user_id", userID);
	fd.append("uuid", uuidv4());
	fd.append("name", name);
	fd.append("address", address);
	fd.append("city", city);
	fd.append("province", province);
	fd.append("birthday", birthday);
	fd.append("gender", gender);
	fd.append("email", email);
	fd.append("phone", phone);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/patients/add_patient",
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
