$(document).ready(function() {
	var productCode = $("#product-code").val().trim();
	var qrcode = new QRCode("qr-img", {
		text: productCode,
		width: 300,
		height: 300,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
});

function saveQR() {
	html2canvas(document.getElementById('qr-img')).then((canvas) => {
		$("#download-jpg").attr("href", canvas.toDataURL('image/jpeg'))
			.attr('download', uuidv4()+".jpg")
			.click();
		document.getElementById("download-jpg").click();
	});
}

function print() {
	html2canvas(document.getElementById('qr-img')).then((canvas) => {
		var qrImg = canvas.toDataURL('image/jpeg');
		var w = window.open();
		w.document.write("<img src='"+qrImg+"' width='300px' height='300px'>");
		w.onafterprint = function() {
		};
		w.print();
		w.close();
	});
}
