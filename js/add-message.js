var selectedFile = null;
var users = [];

$(document).ready(function() {
	getUsers();
	// FOR TESTING ONLY
	$("#title").val("Judul Notifikasi 6");
	$("#content").val("Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi. Konten notifikasi.");
	$("#date").val("2020-08-03");
	$("#time").val("10:00 AM");
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

function addMessage() {
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
		receiverID = parseInt(users[selectedUserIndex-1]['id']);
	}
	let fd = new FormData();
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
		url: PHP_URL+"/admin/add_message",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}

function cancelAdding() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
		window.history.back();
	}
}
