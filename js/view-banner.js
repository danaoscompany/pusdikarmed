$(document).ready(function() {
	var bannerID = parseInt($("#banner-id").val().trim());
	let fd = new FormData();
	fd.append("id", bannerID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_banner_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			$("#banner-img").attr("src", "http://"+HOST+"/userdata/images/"+obj['img']);
		}
	});
});
