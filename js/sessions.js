var sessions = [];
var selectedSessionIndex = 0;

$(document).ready(function() {
	getUsers();
	var adminID = parseInt($("#admin-id").val().trim());
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
	let fd = new FormData();
	fd.append("user_id", userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/sessions/get_by_user_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			sessions = JSON.parse(response);
			for (let i=0; i<sessions.length; i++) {
				let session = sessions[i];
				$("#sessions").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+session['user_name']+"</td>" +
					"                                        <td>"+session['name']+"</td>" +
					"                                        <td>"+session['date']+"</td>" +
					"                                        <td><button onclick='editSession("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteSession("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editSession(index) {
	$.redirect('http://batterynusantara.com/sessions/edit', {
		'uuid': sessions[index]['uuid']
	});
}

function confirmDeleteSession(index) {
	selectedSessionIndex = index;
	$("#confirmLabel").html("Delete Session");
	$("#confirm-message").html("Are you sure you want to delete this session?");
	$("#confirm").modal('show');
}

function deleteSession() {
	let uuid = sessions[selectedSessionIndex]['uuid'];
	let fd = new FormData();
	fd.append("uuid", uuid);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/sessions/delete_by_uuid",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var selectedIndex = parseInt($("#users").prop('selectedIndex'));
			if (selectedIndex > 0) {
				selectedIndex--;
				var user = users[selectedIndex];
				getSessions(parseInt(user['id']));
			}
		}
	});
}
