var newsID = 0;
var selectedFile;
var imageChanged = 0;

$(document).ready(function() {
	newsID = parseInt($("#news-id").val().trim());
	let fd = new FormData();
	fd.append("id", newsID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_news_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			imageChanged = 0;
			var news = JSON.parse(response);
			$("#title").val(news['title']);
			$("#content").val(news['content']);
			$("#date").val(news['date'].substr(0, news['date'].indexOf(" ")));
			$("#time").val(news['date'].substr(news['date'].indexOf(" ")+1, news['date'].length));
			var imgURL = news['img_url'];
			if (imgURL == null || imgURL.trim() == "") {
				$("#news-img").css("display", "none");
			} else {
				$("#news-img").attr("src", "http://"+HOST+"/userdata/images/"+imgURL)
					.css("display", "block");
			}
		}
	});
});

function selectPicture() {
	$("#select-news-img").on('change', function() {
		var file = this.files[0];
		selectedFile = file;
		imageChanged = 1;
		var fr = new FileReader();
		fr.onload = function(event) {
			$("#news-img").attr("src", event.target.result).css("display", "block");
		};
		fr.readAsDataURL(file);
	}).click();
}

function save() {
	var title = $("#title").val().trim();
	var content = $("#content").val().trim();
	var date = $("#date").val().trim();
	var time = $("#time").val().trim();
	if (title == "" || content == "" || date == "" || time == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData()
	fd.append("id", newsID);
	fd.append("title", title);
	fd.append("content", content);
	fd.append("date", date+" "+time);
	fd.append("file", selectedFile);
	fd.append("image_changed", imageChanged);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_news",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}

function cancel() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan")) {
		window.history.back();
	}
}
