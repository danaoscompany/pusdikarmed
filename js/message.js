var messages = [];
var selectedMessageIndex = 0;

$(document).ready(function() {
	getMessages();
});

function getMessages() {
	$("#messages").find("*").remove();
	$.ajax({
		type: 'GET',
		url: PHP_URL+'/admin/get_messages',
		dataType: 'text',
		cache: false,
		success: function(response) {
			messages = JSON.parse(response);
			for (let i=0; i<messages.length; i++) {
				let message = messages[i];
				var description = message['message'];
				if (description.length >= 20) {
					description = description.substr(0, 20);
				}
				var imgTag = "";
				var imgURL = message['img_url'];
				if (imgURL == null || imgURL == "") {
					imgTag = "";
				} else {
					imgTag = "<img src='http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/userdata/images/"+imgURL+"' width='100px' height='100px'>";
				}
				if (message['type'] == 'text') {
					$("#messages").append("<tr>" +
						"                                        <th scope=\"row\">" + (i + 1) + "</th>" +
						"                                        <td>" + message['message'] + "</td>" +
						"                                        <td>" + message['user_name'] + "</td>" +
						"                                        <td>" + moment(message['date']).format('DD MMMM YYYY hh:mm:ss') + "</td>" +
						"                                        <td><button onclick='viewMessage(" + i + ")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Lihat</button></td>" +
						"                                        <td><button onclick='confirmDeleteMessage(" + i + ")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
						"                                    </tr>");
				} else if (message['type'] == 'image') {
					$("#messages").append("<tr>" +
						"                                        <th scope=\"row\">" + (i + 1) + "</th>" +
						"                                        <td><img src=\"http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/userdata/"+message['image']+"\" width='70px' height='70px'></td>" +
						"                                        <td>" + message['user_name'] + "</td>" +
						"                                        <td>" + moment(message['date']).format('DD MMMM YYYY hh:mm:ss') + "</td>" +
						"                                        <td><button onclick='viewMessage(" + i + ")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Lihat</button></td>" +
						"                                        <td><button onclick='confirmDeleteMessage(" + i + ")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
						"                                    </tr>");
				}
			}
		}
	});
}

function viewMessage(index) {
	var message = messages[index];
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/message/view", {
		'id': parseInt(message['id'])
	});
}

function confirmDeleteMessage(index) {
	selectedMessageIndex = index;
	$("#confirmLabel").html("Hapus Pesan");
	$("#confirmBody").html("Apakah Anda yakin ingin menghapus pesan ini?");
	$("#confirm").modal('show');
}

function deleteMessage() {
	var messageID = messages[selectedMessageIndex]['id'];
	let fd = new FormData();
	fd.append("id", messageID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/admin/delete_message_by_id',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/message";
		}
	});
}
