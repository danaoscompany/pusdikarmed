var iconStyle;
var lat = -6.200000;
var lng = 106.816666;
var sellers = [];

$(document).ready(function() {
	var map = new ol.Map({
		target: 'map',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([lng, lat]),
			zoom: 4
		})
	});
	var feature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
	});
	iconStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 25],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 0.75,
			src: 'http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/userdata/system/map.png'
		}))
	});
	feature.setStyle(iconStyle);
	var layer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [
				feature
			]
		})
	});
	map.addLayer(layer);
	map.on('singleclick', function(event) {
		var coordinate = event.coordinate;
		map.removeLayer(layer);
		var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
		lng = lonlat[0];
		lat = lonlat[1];
		var feature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
		});
		feature.setStyle(iconStyle);
		layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					feature
				]
			})
		});
		map.addLayer(layer);
	});
	getSellers();
});

function getSellers() {
	sellers = [];
	$("#sellers").find("*").remove();
	$("#sellers").append("<option>Pilih Penjual</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_sellers",
		dataType: 'text',
		cache: false,
		success: function(response) {
			sellers = JSON.parse(response);
			for (let i=0; i<sellers.length; i++) {
				let seller = sellers[i];
				$("#sellers").append("<option>"+seller['name']+"</option>");
			}
			getStores();
		}
	});
}

function add() {
	var userID = parseInt(sellers[$("#sellers").prop('selectedIndex')-1]['id']);
	var name = $("#name").val().trim();
	var description = $("#description").val().trim();
	var phone = $("#phone").val().trim();
	if (name == "" || description == "" || phone == "") {
		alert("Mohon lengkapi data");
		return;
	}
	let fd = new FormData();
	fd.append("user_id", userID);
	fd.append("name", name);
	fd.append("description", description);
	fd.append("phone", phone);
	fd.append("lat", lat);
	fd.append("lng", lng);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_store",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.location.href = "http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/store";
		}
	});
}
