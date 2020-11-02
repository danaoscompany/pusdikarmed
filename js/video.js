var videos = [];
var selectedVideoIndex = 0;

$(document).ready(function() {
	getVideos();
	let userID = parseInt($("#admin-id").val());
	let fd = new FormData();
	fd.append("cmd", "SELECT * FROM `admins` WHERE `id`="+userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/main/query",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response)[0];
			$("#admin-name").html(obj['name']);
			$("#admin-email").html(obj['email']);
		}
	});
});

function getVideos() {
	$("#videos").find("*").remove();
	$.ajax({
		type: 'GET',
		url: PHP_URL+'/admin/get_videos',
		dataType: 'text',
		cache: false,
		success: function(response) {
			videos = JSON.parse(response);
			for (let i=0; i<videos.length; i++) {
				let video = videos[i];
				$("#videos").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+video['name']+"</td>" +
					"                                        <td>"+video['file_name']+"</td>" +
					"                                        <td><button onclick='editVideo("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteVideo("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editVideo(index) {
	var video = videos[index];
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/video/edit", {
		'id': parseInt(video['id'])
	});
}

function confirmDeleteVideo(index) {
	selectedVideoIndex = index;
	$("#confirmLabel").html("Hapus Video");
	$("#confirmBody").html("Apakah Anda yakin ingin menghapus video berikut?");
	$("#confirm").modal('show');
}

function deleteVideo() {
	var id = videos[selectedVideoIndex]['id'];
	let fd = new FormData();
	fd.append("id", id);
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/admin/delete_video',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/video";
		}
	});
}
