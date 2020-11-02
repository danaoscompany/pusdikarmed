var stores = [];

$(document).ready(function() {
	getStores();
});

function getStores() {
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_stores",
		dataType: 'text',
		cache: false,
		success: function(response) {
			stores = JSON.parse(response);
			for (let i=0; i<stores.length; i++) {
				var store = stores[i];
				$("#stores").append("<tr>\n" +
					"\t\t\t\t\t\t\t\t\t\t<th scope=\"row\">"+(i+1)+"</th>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+store['email']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+store['password']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+store['name']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+store['description']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+store['phone']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='editStore("+i+")' class=\"mb-2 mr-2 btn btn-info\" style=\"margin-top: 10px;\">Ubah</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='deleteStore("+i+")' class=\"mb-2 mr-2 btn btn-danger\" style=\"margin-top: 10px;\">Hapus</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t</tr>");
			}
		}
	});
}

function editStore(index) {
	var store = stores[index];
	$.redirect('http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/store/edit', {
		'id': parseInt(store['id'])
	});
}

function deleteStore(index) {
	var store = stores[index];
	if (confirm("Apakah Anda yakin ingin menghapus toko berikut?")) {
		let fd = new FormData();
		fd.append("id", store['id']);
		$.ajax({
			type: 'POST',
			url: PHP_URL+"/admin/delete_store_by_id",
			data: fd,
			processData: false,
			contentType: false,
			cache: false,
			success: function(response) {
				window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/store";
			}
		});
	}
}
