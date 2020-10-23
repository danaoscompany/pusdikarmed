var selectedFile = null;
var users = [];
var messageID = 0;

$(document).ready(function() {
	messageID = parseInt($("#message-id").val().trim());
	getUsers();
});

function getUsers() {
	$("#users").find("*").remove();
	$("#users").append("<option>--- Pilih Pengguna ---</option>");
	$("#users").append("<option>--- Semua ---</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+'/admin/get_users',
		dataType: 'text',
		cache: false,
		success: function(response) {
			users = JSON.parse(response);
			for (let i=0; i<users.length; i++) {
				let user = users[i];
				$("#users").append("<option>"+user['name']+"</option>");
			}
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
					$("#title").val(message['title']);
					$("#content").val(message['description']);
					$("#date").val(message['date'].substr(0, message['date'].indexOf(" ")));
					$("#time").val(message['date'].substr(message['date'].indexOf(" ")+1, message['date'].length));
					var imgURL = message['img_url'];
					if (imgURL == null || imgURL.trim() == "") {
						$("#message-img").css("display", "none");
					} else {
						$("#message-img").attr("src", "http://" + HOST + "/userdata/images/" + imgURL)
							.css("display", "block");
					}
					var receiverID = parseInt(message['receiver_id']);
					if (receiverID == -1) {
						$("#users").prop('selectedIndex', 1);
					} else {
						for (let i = 0; i < users.length; i++) {
							let user = users[i];
							let userID = parseInt(user['id']);
							if (receiverID == userID) {
								$("#users").prop('selectedIndex', i + 2);
							}
						}
					}
				}
			});
		}
	});
}

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

function cancel() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan")) {
		window.history.back();
	}
}
