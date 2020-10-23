var banners = [];

$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_banners",
		dataType: 'text',
		cache: false,
		success: function(response) {
			banners = JSON.parse(response);
			for (let i=0; i<banners.length; i++) {
				let banner = banners[i];
				$("#banners").append("<div class=\"col-md-6 col-lg-3\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"card-shadow-danger mb-3 widget-chart widget-chart2 text-left card\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"widget-content\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"widget-content-outer\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"http://batterynusantara.com/userdata/images/"+banner['img']+"\" width=\"100%\" height=\"100px\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100%; display: flex; flex-direction: column; align-items: center;\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button onclick='viewBanner("+i+")' class=\"mb-2 mr-2 btn btn-info\" style=\"margin-top: 10px;\">Lihat</button>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button onclick='confirmDeleteBanner("+i+")' class=\"mb-2 mr-2 btn btn-danger\" style=\"margin-top: -5px;\">Hapus</button>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>")
			}
		}
	});
});

function viewBanner(index) {
	var banner = banners[index];
	$.redirect("http://batterynusantara.com/banner/view_banner", {
		'id': parseInt(banner['id'])
	});
}

function confirmDeleteBanner(index) {
	var banner = banners[index];
	if (confirm("Apakah Anda yakin ingin menghapus banner berikut?")) {
		let fd = new FormData();
		fd.append("id", banner['id']);
		$.ajax({
			type: 'POST',
			url: PHP_URL+"/admin/delete_banner_by_id",
			data: fd,
			processData: false,
			contentType: false,
			cache: false,
			success: function(response) {
				window.location.href = "http://batterynusantara.com/banner";
			}
		});
	}
}

function addBanner() {
	$("#select-file").on('change', function() {
		var file = this.files[0];
		let fd = new FormData();
		fd.append("file", file);
		$.ajax({
			type: 'POST',
			url: PHP_URL+"/admin/add_banner",
			data: fd,
			processData: false,
			contentType: false,
			cache: false,
			success: function(response) {
				window.location.href = "http://batterynusantara.com/banner";
			}
		});
	}).click();
}
