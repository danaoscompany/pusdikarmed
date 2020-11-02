var selectedFile;

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
	fd.append("name", name);
	fd.append("file", selectedFile);
	fd.append("type", type);
	fd.append("year", year);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_document",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/admin/document";
		}
	});
}

function cancelEditing() {
	window.history.back();
}
