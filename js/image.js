var users = [];
var sessions = [];
var images = [];

$(document).ready(function() {
	getUsers();
	let adminID = parseInt($("#admin-id").val());
	let fd = new FormData();
	fd.append("id", adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			$("#admin-name").html(obj['name']);
			$("#admin-email").html(obj['email']);
		}
	});
});

function getUsers() {
	users = [];
	$("#users").find("*").remove();
	$("#users").on('change', function() {
		var selectedIndex = parseInt($("#users").prop('selectedIndex'));
		if (selectedIndex > 0) {
			selectedIndex--;
			var user = users[selectedIndex];
			getSessions(parseInt(user['id']));
		} else {
			$("#sessions").find("*").remove();
			$("#sessions").append("<option>Pilih Session</option>");
			$("#images").find("*").remove();
		}
	});
	let fd = new FormData();
	fd.append("start", 0);
	fd.append("length", -1);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_all_users_with_length",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			users = JSON.parse(response);
			$("#users").append("<option>--- Choose User ---</option>");
			for (var i=0; i<users.length; i++) {
				var user = users[i];
				$("#users").append("<option>"+user['first_name']+" "+user['last_name']+"</option>");
			}
			if (users.length > 0) {
				$("#users option").eq(1).prop('selected', true);
				getSessions(parseInt(users[0]['id']));
			}
		}
	});
}

function getSessions(userID) {
	sessions = [];
	$("#sessions").find("*").remove();
	$("#sessions").append("<option>Pilih Session</option>");
	$("#sessions").on("change", function() {
		var userIndex = parseInt($("#users").prop('selectedIndex'));
		if (userIndex > 0) {
			userIndex--;
			var sessionIndex = parseInt($("#sessions").prop('selectedIndex'));
			if (sessionIndex > 0) {
				sessionIndex--;
				getImages(parseInt(users[userIndex]['id']), sessions[sessionIndex]['uuid']);
			} else {
				$("#images").find("*").remove();
			}
		} else {
			$("#sessions").find("*").remove();
			$("#sessions").append("<option>Pilih Session</option>");
			$("#images").find("*").remove();
		}
	});
	let fd = new FormData();
	fd.append("user_id", userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_sessions_by_user_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			sessions = JSON.parse(response);
			for (var i=0; i<sessions.length; i++) {
				var session = sessions[i];
				$("#sessions").append("<option>"+session['name']+"</option>");
			}
			if (sessions.length > 0) {
				var sessionsLength = $("#sessions option").length;
				$("#sessions option").eq(1).prop('selected', true);
				getImages(userID, sessions[0]['uuid']);
			} else {
				$("#images").find("*").remove();
			}
		}
	});
}

function getImages(userID, sessionUUID) {
	if (userID == undefined || sessionUUID == undefined) return;
	images = [];
	$("#images").find("*").remove();
	let fd = new FormData();
	fd.append("user_id", userID);
	fd.append("session_uuid", sessionUUID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/image/get_images",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			images = JSON.parse(response);
			$("#images").find("*").remove();
			for (var i=0; i<images.length; i++) {
				var image = images[i];
				$("#images").append("<div class=\"col-md-6 col-lg-3\">\n" +
					"          <div class=\"card-shadow-danger mb-3 widget-chart widget-chart2 text-left card\">\n" +
					"           <div class=\"widget-content\">\n" +
					"            <div class=\"widget-content-outer\">\n" +
					"             <img src=\"http://pusdikarmed.kodiklat-tniad.mil.id/admin/userdata/"+image['path']+"\" style='border-radius: 5px;' width=\"100%\" height=\"150px\">\n" +
					"             <div style=\"width: 100%; display: flex; flex-direction: column; align-items: center;\">\n" +
					"              <button onclick=\"viewImage("+i+")\" class=\"mb-2 mr-2 btn btn-info\" style=\"margin-top: 10px;\">View</button>\n" +
					"              <button class=\"mb-2 mr-2 btn btn-danger\" style=\"margin-top: -5px;\">Delete</button>\n" +
					"             </div>\n" +
					"            </div>\n" +
					"           </div>\n" +
					"          </div>\n" +
					"         </div>");
			}
		}
	});
}

function viewImage(index) {
	var image = images[index];
	$("#uuid").val(image['uuid']);
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/image/view_image", {
		uuid: image['uuid']
	});
}
