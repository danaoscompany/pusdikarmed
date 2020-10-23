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
				var receiverID = parseInt(message['receiver_id']);
				var receiverName = "Semua";
				if (receiverID == -1) {
					receiverName = "Semua";
				} else {
					receiverName = message['receiver_name'];
				}
				var description = message['description'];
				if (description.length >= 20) {
					description = description.substr(0, 20);
				}
				var imgTag = "";
				var imgURL = message['img_url'];
				if (imgURL == null || imgURL == "") {
					imgTag = "";
				} else {
					imgTag = "<img src='http://batterynusantara.com/userdata/images/"+imgURL+"' width='100px' height='100px'>";
				}
				$("#messages").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+imgTag+"</td>" +
					"                                        <td>"+message['title']+"</td>" +
					"                                        <td>"+description+"</td>" +
					"                                        <td>"+receiverName+"</td>" +
					"                                        <td>"+moment(message['date']).format('DD MMMM YYYY hh:mm:ss')+"</td>" +
					"                                        <td><button onclick='editMessage("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteMessage("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editMessage(index) {
	var message = messages[index];
	$.redirect("http://batterynusantara.com/message/edit", {
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
			window.location.href = "http://batterynusantara.com/message";
		}
	});
}
