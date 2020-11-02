var selectedFile;
var selectedFileName;
var documentChanged = false;
var documentID = 0;

$(document).ready(function() {
	documentID = parseInt($("#document-id").val().trim());
	let fd = new FormData();
	fd.append("id", documentID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_document_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			let document = JSON.parse(response);
			$("#name").val(document['name']);
			let path = document['path'];
			$("#document-name").html(document['file_name']);
			if (document['type'] == 'ba') {
				$("#type").prop('selectedIndex', 1);
			} else if (document['type'] == 'pa') {
				$("#type").prop('selectedIndex', 2);
			} else if (document['type'] == 'ta') {
				$("#type").prop('selectedIndex', 3);
			} else if (document['type'] == 'kaldik') {
				$("#type").prop('selectedIndex', 4);
			}
			$("#year").val(document['year']);
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

function addDocument() {
	let name = $("#name").val().trim();
	let type = parseInt($("#type").prop('selectedIndex'));
	let year = $("#year").val().trim();
	if (name == "" || type == 0 || year== "") {
		alert("Mohon lengkapi data");
		return;
	}
	if (type == 1) {
		type = "ba";
	} else if (type == 2) {
		type = "pa";
	} else if (type == 3) {
		type = "ta";
	}
	let fd = new FormData();
	fd.append("id", documentID);
	fd.append("name", name);
	fd.append("file_name", selectedFileName);
	if (documentChanged) {
		fd.append("file", selectedFile);
	}
	fd.append("type", type);
	fd.append("year", year);
	fd.append("document_changed", documentChanged?1:0);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_document",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/document";
		}
	});
}

function cancelEditing() {
	window.history.back();
}
