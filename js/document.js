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
		url: PHP_URL+'/admin/get_documents',
		dataType: 'text',
		cache: false,
		success: function(response) {
			documents = JSON.parse(response);
			for (let i=0; i<documents.length; i++) {
				let document = documents[i];
				let type;
				if (document['type'] == 'ba') {
					type = "Bintara";
				} else if (document['type'] == 'pa') {
					type = "Perwira";
				} else if (document['type'] == 'ta') {
					type = "Tamtama";
				} else if (document['type'] == 'kaldik') {
					type = "Kalender Pendidikan";
				}
				$("#documents").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+document['name']+"</td>" +
					"                                        <td>"+document['year']+"</td>" +
					"                                        <td>"+type+"</td>" +
					"                                        <td><button onclick='editDocument("+i+")' class='btn-shadow p-1 btn btn-primary btn-sm show-toastr-example'>Edit</button></td>" +
					"                                        <td><button onclick='confirmDeleteDocument("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function editDocument(index) {
	var document = documents[index];
	$.redirect("http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/document/edit", {
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
		url: PHP_URL+'/admin/delete_document',
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			getDocuments();
		}
	});
}
