var products = [];
var currentPage = 0;

$(document).ready(function() {
	getProducts();
});

function getProducts() {
	$("#products").find("*").remove();
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_products",
		dataType: 'text',
		cache: false,
		success: function(response) {
			products = JSON.parse(response);
			for (let i=0; i<products.length; i++) {
				let product = products[i];
				$("#products").append("<tr>\n" +
					"\t\t\t\t\t\t\t\t\t\t<th scope=\"row\">1</th>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+product['store_name']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+product['code']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+product['brand']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+product['type']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+product['maker']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='viewQR("+i+")' type=\"button\" class=\"btn btn-primary\">Lihat</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='editProduct("+i+")' type=\"button\" class=\"btn btn-primary\">Ubah</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='confirmDeleteProduct("+i+")' type=\"button\" class=\"btn btn-danger\">Hapus</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t</tr>");
			}
		}
	});
}

function viewQR(index) {
	var product = products[index];
	$.redirect('http://batterynusantara.com/product/view_qr', {
		'product_code': product['code']
	});
}

function printAll() {
	currentPage = 0;
	printNext();
}

function printNext() {
	if (currentPage >= products.length) {
		return;
	}
	$("#qr-img").find("*").remove();
	var product = products[0];
	var code = product['code'];
	var qrcode = new QRCode("qr-img", {
		text: code,
		width: 300,
		height: 300,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
	html2canvas(document.getElementById('qr-img')).then((canvas) => {
		var qrImg = canvas.toDataURL('image/jpeg');
		var w = window.open();
		w.document.write("<img src='"+qrImg+"' width='900px' height='300px'>");
		w.onafterprint = function() {
			currentPage++;
			printNext();
		};
		w.print();
		w.close();
	});
}

function editProduct(index) {
	var product = products[index];
	$.redirect('http://batterynusantara.com/product/edit', {
		'id': parseInt(product['id'])
	});
}

function confirmDeleteProduct(index) {
	if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
		let product = products[index];
		let fd = new FormData();
		fd.append("id", product['id']);
		$.ajax({
			type: 'POST',
			url: PHP_URL+"/admin/delete_product_by_id",
			data: fd,
			processData: false,
			contentType: false,
			cache: false,
			success: function(response) {
				getProducts();
			}
		});
	}
}
