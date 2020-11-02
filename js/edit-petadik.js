var selectedFile;
var selectedFileName;
var documentID = 0;
var documentChanged = false;

$(document).ready(function() {
	documentID = parseInt($("#document-id").val().trim());
	let fd = new FormData();
	fd.append("id", documentID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_petadik_document_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			let document = JSON.parse(response);
			$("#name").val(document['title']);
			$("#document-name").html(document['file_name']);
		}
	});
});

function selectDocument() {
	$("#select-file").on('change', function(e) {
		var file = e.target.files[0];
		var fileName = file.name;
		var extension = fileName.substr(fileName.lastIndexOf(".")+1, fileName.length).toLowerCase();
		if (extension != "pdf") {
			alert("Mohon pilih dokumen berformat PDF!");
			return;
		}
		selectedFile = file;
		documentChanged = true;
		selectedFileName = fileName;
		$("#document-name").html(fileName);
	}).click();
}

function save() {
	let name = $("#name").val().trim();
	if (name == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("id", documentID);
	fd.append("name", name);
	if (documentChanged) {
		fd.append("file_name", selectedFileName);
		fd.append("file", selectedFile);
	}
	fd.append("document_changed", documentChanged?1:0);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_petadik_document",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/admin/petadik";
		}
	});
}

function cancelEditing() {
	window.history.back();
}
