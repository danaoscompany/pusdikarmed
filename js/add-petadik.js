var selectedFile;
var selectedFileName;

$(document).ready(function() {
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
		selectedFileName = fileName;
		$("#document-name").html(fileName);
	}).click();
}

function addDocument() {
	let name = $("#name").val().trim();
	if (name == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("name", name);
	fd.append("file_name", selectedFileName);
	fd.append("file", selectedFile);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_petadik_document",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/petadik";
		}
	});
}

function cancelEditing() {
	window.history.back();
}
