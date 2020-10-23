var selectedFile;

$(document).ready(function() {
});

function selectPicture() {
	$("#select-news-img").on('change', function() {
		var file = this.files[0];
		selectedFile = file;
		var fr = new FileReader();
		fr.onload = function(event) {
			$("#news-img").attr("src", event.target.result).css("display", "block");
		};
		fr.readAsDataURL(file);
	}).click();
}

function addNews() {
	var title = $("#title").val().trim();
	var content = $("#content").val().trim();
	var date = $("#date").val().trim();
	var time = $("#time").val().trim();
	if (title == "" || content == "" || date == "" || time == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("title", title);
	fd.append("content", content);
	fd.append("date", date+" "+time);
	fd.append("file", selectedFile);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_news",
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
