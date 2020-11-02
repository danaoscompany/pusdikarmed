var settings = [];

$(document).ready(function() {
	let userID = parseInt($("#user-id").val());
	let fd = new FormData();
	fd.append("id", userID);
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
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_settings",
		dataType: 'text',
		cache: false,
		success: function(response) {
			settings = JSON.parse(response);
			$("#premium-price").val(settings[0]['premium_price']);
		}
	});
});

function save() {
	var premiumPrice = parseFloat($("#premium-price").val());
	let fd = new FormData();
	fd.append("premium_price", premiumPrice);
	$.ajax({
		type: 'POST',
		url: PHP_URL + "/admin/update_settings",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function (response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/common";
		}
	});
}
