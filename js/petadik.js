var documents = [];
var selectedDocumentIndex = 0;

$(document).ready(function() {
	getDocuments();
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

function getDocuments() {
	$("#documents").find("*").remove();
	$.ajax({
		type: 'GET',
		url: PHP_URL+'/admin/get_petadik_documents',
		dataType: 'text',
		cache: false,
		success: function(response) {
			documents = JSON.parse(response);
			for (let i=0; i<documents.length; i++) {
				let document = documents[i];
				let path = document['path'];
				path = path.substr(path.lastIndexOf("/")+1, path.length);
				$("#documents").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+document['title']+"</td>" +
					"                                        <td>"+document['file_name']+"</td>" +
					"                                        <td><button onclick='editDocument("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteDocument("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editDocument(index) {
	var document = documents[index];
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/admin/petadik/edit", {
		'id': parseInt(document['id'])
	});
}

function confirmDeleteDocument(index) {
	selectedDocumentIndex = index;
	$("#confirmLabel").html("Hapus Dokumen");
	$("#confirmBody").html("Apakah Anda yakin ingin menghapus dokumen berikut?");
	$("#confirm").modal('show');
}

function deleteDocument() {
	var id = documents[selectedDocumentIndex]['id'];
	let fd = new FormData();
	fd.append("id", id);
	$.ajax({
		type: 'POST',
		url: PHP_URL+'/admin/delete_petadik_document',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			getDocuments();
		}
	});
}
