var allNews = [];

$(document).ready(function() {
	getNews();
});

function getNews() {
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_news",
		dataType: 'text',
		cache: false,
		success: function(response) {
			allNews = JSON.parse(response);
			for (let i=0; i<allNews.length; i++) {
				let news = allNews[i];
				var content = news['content'];
				if (content.length >= 30) {
					content = content.substr(0, 30);
				}
				$("#news").append("<tr>\n" +
					"\t\t\t\t\t\t\t\t\t\t<th scope=\"row\">1</th>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><img src='http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/userdata/images/"+news['img_url']+"' width='100px' height='100px'></td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+news['title']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+content+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+moment(news['date']).format('D MMMM YYYY HH:MM:SS')+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='editNews("+i+")' type=\"button\" class=\"btn btn-primary\">Ubah</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button onclick='confirmDeleteNews("+i+")' type=\"button\" class=\"btn btn-danger\">Hapus</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t</tr>");
			}
		}
	});
}

function editNews(index) {
	var news = allNews[index];
	$.redirect('http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/news/edit', {
		'id': parseInt(news['id'])
	});
}

function confirmDeleteNews(index) {
	if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
		var news = allNews[index];
		let fd = new FormData();
		fd.append("id", parseInt(news['id']));
		$.ajax({
			type: 'POST',
			url: PHP_URL+"/admin/delete_news_by_id",
			data: fd,
			processData: false,
			contentType: false,
			cache: false,
			success: function(response) {
				window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/news";
			}
		});
	}
}
