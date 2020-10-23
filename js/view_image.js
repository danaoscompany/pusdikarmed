var uuid = "";

$(document).ready(function() {
	uuid = $("#uuid").val();
	var adminID = parseInt($("#admin-id").val().trim());
	let fd3 = new FormData();
	fd3.append("cmd", "SELECT * FROM `admins` WHERE `id`="+adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/main/query",
		data: fd3,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response)[0];
			$("#admin-name").html(obj['name']);
			$("#admin-email").html(obj['email']);
		}
	});
	let fd = new FormData();
	fd.append("uuid", uuid);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/image/get_by_uuid",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var image = JSON.parse(response);
			$("#img-preview").attr("src", "http://batterynusantara.com/userdata/"+image['path']);
			let fd2 = new FormData();
			fd2.append("session_uuid", image['session_uuid']);
			$.ajax({
				type: 'POST',
				url: PHP_URL+"/image/get_marks_by_session_uuid",
				data: fd2,
				processData: false,
				contentType: false,
				cache: false,
				success: function(response) {
					var obj = JSON.parse(response);
					{
						var leftImageX = parseInt(obj['left_image_x']);
						var leftImageY = parseInt(obj['left_image_y']);
						var leftImageWidth = parseInt(obj['left_image_width']);
						var leftImageHeight = parseInt(obj['left_image_height']);
						//console.log("Left width: "+leftImageWidth+", left height: "+leftImageHeight);
						var leftPoint = JSON.parse(obj['left_points'])[0];
						var leftX = parseInt(leftPoint['x']);
						var leftY = parseInt(leftPoint['y']);
						var cvsLeft = document.getElementById("cvs-left");
						var ctxLeft = cvsLeft.getContext("2d");
						ctxLeft.beginPath();
						ctxLeft.arc(getRealX(leftX - leftImageX, leftImageWidth, 141), getRealY(leftY - leftImageY, leftImageHeight, 400), 5, 0, 2 * Math.PI, false);
						ctxLeft.fillStyle = 'red';
						ctxLeft.fill();
					}
					{
						var frontImageX = parseInt(obj['front_image_x']);
						var frontImageY = parseInt(obj['front_image_y']);
						var frontImageWidth = parseInt(obj['front_image_width']);
						var frontImageHeight = parseInt(obj['front_image_height']);
						var frontPoint = JSON.parse(obj['front_points'])[0];
						var frontX = parseInt(frontPoint['x']);
						var frontY = parseInt(frontPoint['y']);
						var cvsfront = document.getElementById("cvs-front");
						var ctxfront = cvsfront.getContext("2d");
						//console.log("Front width: "+frontImageWidth+", front height: "+frontImageHeight);
						ctxfront.beginPath();
						ctxfront.arc(getRealX(frontX - frontImageX, frontImageWidth, 341), getRealY(frontY - frontImageY, frontImageHeight, 400), 5, 0, 2 * Math.PI, false);
						ctxfront.fillStyle = 'red';
						ctxfront.fill();
					}
					{
						var rightImageX = parseInt(obj['right_image_x']);
						var rightImageY = parseInt(obj['right_image_y']);
						var rightImageWidth = parseInt(obj['right_image_width']);
						var rightImageHeight = parseInt(obj['right_image_height']);
						var rightPoint = JSON.parse(obj['right_points'])[0];
						var rightX = parseInt(rightPoint['x']);
						var rightY = parseInt(rightPoint['y']);
						//console.log("Right width: "+rightImageWidth+", right height: "+rightImageHeight);
						var cvsright = document.getElementById("cvs-right");
						var ctxright = cvsright.getContext("2d");
						ctxright.beginPath();
						ctxright.arc(getRealX(rightX - rightImageX, rightImageWidth, 141), getRealY(rightY - rightImageY, rightImageHeight, 400), 5, 0, 2 * Math.PI, false);
						ctxright.fillStyle = 'red';
						ctxright.fill();
					}
					{
						var backImageX = parseInt(obj['back_image_x']);
						var backImageY = parseInt(obj['back_image_y']);
						var backImageWidth = parseInt(obj['back_image_width']);
						var backImageHeight = parseInt(obj['back_image_height']);
						var backPoint = JSON.parse(obj['back_points'])[0];
						var backX = parseInt(backPoint['x']);
						var backY = parseInt(backPoint['y']);
						//console.log("Back width: "+backImageWidth+", back height: "+backImageHeight);
						var cvsback = document.getElementById("cvs-back");
						var ctxback = cvsback.getContext("2d");
						ctxback.beginPath();
						ctxback.arc(getRealX(backX - backImageX, backImageWidth, 341), getRealY(backY - backImageY, backImageHeight, 400), 5, 0, 2 * Math.PI, false);
						ctxback.fillStyle = 'red';
						ctxback.fill();
					}
				}
			});
		}
	});
});

function getRealX(x, width, anatomyWidth) {
	return (x*anatomyWidth)/width;
}

function getRealY(y, height, anatomyHeight) {
	return (y*anatomyHeight)/height;
}
