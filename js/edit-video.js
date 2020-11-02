var videoID = 0;
var selectedFile = null;
var selectedFileName;
var selectedVideoThumbnail;
var selectedVideoDuration = 0;
var videoChanged = false;
var ajax;

$(document).ready(function() {
	videoID = parseInt($("#video-id").val().trim());
	let fd = new FormData();
	fd.append("id", videoID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_video_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			let videoInfo = JSON.parse(response);
			$("#name").val(videoInfo['name']);
			$("#video-name").html(videoInfo['file_name']);
		}
	});
});

function save() {
	let name = $("#name").val().trim();
	if (name == "") {
		alert("Mohon lengkapi data");
		return;
	}
	uploadFile(name);
}

function _(el) {
	return document.getElementById(el);
}

function selectDocument() {
	$("#file1").on('change', function(e) {
		var file = e.target.files[0];
		var fileName = file.name;
		var extension = fileName.substr(fileName.lastIndexOf(".")+1, fileName.length).toLowerCase();
		if (extension == "mp4" || extension == "ogg" || extension == "flv" || extension == "3gp") {
			selectedFile = file;
			selectedFileName = fileName;
			videoChanged = true;
			document.getElementById("video-preview").onloadeddata = function() {
				setTimeout(() => {
					selectedVideoDuration = parseFloat(document.getElementById('video-preview').duration);
					getVideoCover(selectedFile, parseInt(selectedVideoDuration)/2).then((blob) => {
						selectedVideoThumbnail = blob;
					});
				}, 100);
			};
			$('#video-preview').attr("src", URL.createObjectURL(selectedFile));
			$("#document-name").html(fileName);
		} else {
			alert("Format video yg didukung: MP4, OGG, FLV, 3GP.");
			return;
		}
	}).click();
}

function uploadFile(name) {
	if (videoChanged) {
		var fr = new FileReader();
		fr.onload = function (e) {
			let imageData = e.target.result;
			$("#upload").prop("disabled", true);
			$("#upload_form").css("display", "block");
			var file = selectedFile;
			// alert(file.name+" | "+file.size+" | "+file.type);
			startUpload(name, imageData);
		};
		fr.readAsDataURL(selectedVideoThumbnail);
	} else {
		startUpload(name, "");
	}
}

function startUpload(name, imageData) {
	var formdata = new FormData();
	formdata.append("id", videoID);
	formdata.append("name", name);
	if (videoChanged) {
		formdata.append("file", selectedFile);
		formdata.append("file_name", selectedFileName);
		formdata.append("thumbnail", imageData);
	}
	formdata.append("duration", selectedVideoDuration);
	formdata.append("video_changed", videoChanged?1:0);
	ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/admin/update_video");
	ajax.send(formdata);
}

function progressHandler(event) {
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
}

function completeHandler(event) {
	window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/video";
}

function errorHandler(event) {
	_("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
	_("status").innerHTML = "Upload Aborted";
}

function getVideoCover(file, seekTo = 0.0) {
	console.log("getting video cover for file: ", file);
	return new Promise((resolve, reject) => {
		// load the file to a video player
		const videoPlayer = document.createElement('video');
		videoPlayer.setAttribute('src', URL.createObjectURL(file));
		videoPlayer.load();
		videoPlayer.addEventListener('error', (ex) => {
			reject("error when loading video file", ex);
		});
		// load metadata of the video to get video duration and dimensions
		videoPlayer.addEventListener('loadedmetadata', () => {
			// seek to user defined timestamp (in seconds) if possible
			if (videoPlayer.duration < seekTo) {
				reject("video is too short.");
				return;
			}
			// delay seeking or else 'seeked' event won't fire on Safari
			setTimeout(() => {
				videoPlayer.currentTime = seekTo;
			}, 200);
			// extract video thumbnail once seeking is complete
			videoPlayer.addEventListener('seeked', () => {
				console.log('video is now paused at %ss.', seekTo);
				// define a canvas to have the same dimension as the video
				const canvas = document.createElement("canvas");
				canvas.width = videoPlayer.videoWidth;
				canvas.height = videoPlayer.videoHeight;
				// draw the video frame to canvas
				const ctx = canvas.getContext("2d");
				ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
				// return the canvas image as a blob
				ctx.canvas.toBlob(
					blob => {
						resolve(blob);
					},
					"image/jpeg",
					0.75 /* quality */
				);
			});
		});
	});
}

function goBack() {
	window.history.back();
}
