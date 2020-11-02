var selectedFile = null;
var users = [];
var messageID = 0;

$(document).ready(function() {
	messageID = parseInt($("#message-id").val().trim());
	let fd = new FormData();
	fd.append("id", messageID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_message_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var message = JSON.parse(response);
			$("#sender").val(message['sender']);
			if (message['type'] == 'text') {
				$("#message").val(message['message']);
				$("#message-container").css("display", "block");
				$("#image-container").css("display", "none");
			} else if (message['type'] == 'image') {
				$("#image").attr("src", "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/userdata/"+message['image']);
				$("#message-container").css("display", "none");
				$("#image-container").css("display", "block");
			}
			$("#date").val(message['date'].substr(0, message['date'].indexOf(" ")));
			$("#time").val(message['date'].substr(message['date'].indexOf(" ")+1, message['date'].length));
		}
	});
});

function selectPicture() {
	$("#select-message-img").on('change', function() {
		var file = this.files[0];
		selectedFile = file;
		var fr = new FileReader();
		fr.onload = function(event) {
			$("#message-img").attr("src", event.target.result).css("display", "block");
		};
		fr.readAsDataURL(file);
	}).click();
}

function save() {
	var title = $("#title").val().trim();
	var content = $("#content").val().trim();
	var date = $("#date").val().trim();
	var time = $("#time").val().trim();
	var selectedUserIndex = $("#users").prop('selectedIndex');
	var receiverID = -1;
	if (title == "" || content == "" || date == "" || time == "" || selectedUserIndex == 0) {
		alert("Mohon lengkapi data");
		return;
	}
	if (selectedUserIndex == 1) {
		receiverID = -1;
	} else {
		receiverID = parseInt(users[selectedUserIndex-2]['id']);
	}
	let fd = new FormData();
	fd.append("id", messageID);
	fd.append("title", title);
	fd.append("content", content);
	fd.append("date", date+" "+time);
	if (selectedFile == null) {
		fd.append("image_uploaded", 0);
	} else {
		fd.append("image_uploaded", 1);
		fd.append("file", selectedFile);
	}
	fd.append("receiver_id", receiverID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_message",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}

function goBack() {
	window.history.back();
}
