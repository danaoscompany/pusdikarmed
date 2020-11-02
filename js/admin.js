var admins = [];
var selectedAdminIndex = 0;

$(document).ready(function() {
	getAdmins();
});

function getAdmins() {
	$("#admins").find("*").remove();
	$.ajax({
		type: 'GET',
		url: PHP_URL+'/admin/get_admins',
		dataType: 'text',
		cache: false,
		success: function(response) {
			admins = JSON.parse(response);
			for (let i=0; i<admins.length; i++) {
				let admin = admins[i];
				let role = parseInt(admin['role']);
				if (role == 1) {
					role = "Admin";
				} else if (role == 2) {
					role = "Production";
				} else if (role == 3) {
					role = "Store";
				}
				$("#admins").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+admin['name']+"</td>" +
					"                                        <td>"+admin['email']+"</td>" +
					"                                        <td>"+admin['password']+"</td>" +
					"                                        <td><button onclick='editAdmin("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteAdmin("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editAdmin(index) {
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/admin/edit", {
		'id': admins[index]['id']
	});
}

function confirmDeleteAdmin(index) {
	selectedAdminIndex = index;
	$("#confirmLabel").html("Delete User");
	$("#confirmBody").html("Are you sure you want to delete this user?");
	$("#confirm").modal('show');
}

function deleteAdmin() {
	var adminID = admins[selectedAdminIndex]['id'];
	let fd = new FormData();
	fd.append("id", adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/admin/delete_admin_by_id',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			getAdmins();
		}
	});
}
