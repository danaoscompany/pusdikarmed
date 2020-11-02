$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_settings",
		dataType: 'text',
		cache: false,
		success: function(response) {
			var settings = JSON.parse(response);
			$("#email").val(settings['email']);
			$("#phone").val(settings['phone']);
			$("#tos-url").val(settings['tos_url']);
			$("#privacy-policy-url").val(settings['privacy_policy_url']);
		}
	});
});

function save() {
	var email = $("#email").val().trim();
	var phone = $("#phone").val().trim();
	var tosURL = $("#tos-url").val().trim();
	var privacyPolicyURL = $("#privacy-policy-url").val().trim();
	let fd = new FormData();
	fd.append("email", email);
	fd.append("phone", phone);
	fd.append("tos_url", tosURL);
	fd.append("privacy_policy_url", privacyPolicyURL);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_settings",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/admin/settings";
		}
	});
}

function cancel() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
		window.location.href='http://pusdikarmed.kodiklat-tniad.mil.id/admin/settings';
	}
}
