var iconStyle;
var lat = -6.200000;
var lng = 106.816666;
var stores = [];

$(document).ready(function() {
	// FOR TESTING
	/*$("#code").val("ABC123");
	$("#brand").val("ABC");
	$("#type").val("123");
	$("#maker").val("NamaPembuat");
	$("#description").val("DeskripsiProduk");
	$("#production-date").val("2020-05-09");
	$("#expiry").val("2024-05-09");
	$("#purchase-code").val("ABC456");
	$("#purchase-date").val("2020-05-10");
	$("#store-name").val("NamaToko");
	$("#store-phone-email").val("+62811234567891");
	$("#warranty").val("36");
	$("#service-status").val("StatusLayanan");*/
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
	getStores();
});

function getStores() {
	stores = [];
	$("#stores").find("*").remove();
	$("#stores").append("<option>Pilih Toko</option>");
	$.ajax({
		type: 'GET',
		url: PHP_URL+"/admin/get_stores",
		dataType: 'text',
		cache: false,
		success: function(response) {
			stores = JSON.parse(response);
			for (var i=0; i<stores.length; i++) {
				var store = stores[i];
				$("#stores").append("<option>"+store['name']+"</option>");
			}
		}
	});
}

function addProduct() {
	var storeID = parseInt(stores[$("#stores").prop('selectedIndex')-1]['id']);
	var storeName = stores[$("#stores").prop('selectedIndex')-1]['name'];
	var code = $("#code").val().trim();
	var brand = $("#brand").val().trim();
	var type = $("#type").val().trim();
	var maker = $("#maker").val().trim();
	var description = $("#description").val().trim();
	var productionDate = $("#production-date").val().trim();
	var expiry = $("#expiry").val().trim();
	var purchaseCode = $("#purchase-code").val().trim();
	var purchaseDate = $("#purchase-date").val().trim();
	var storePhoneEmail = $("#store-phone-email").val().trim();
	var warranty = $("#warranty").val().trim();
	var serviceStatus = $("#service-status").val().trim();
	if (warranty == "") {
		warranty = 0;
	} else {
		warranty = parseInt(warranty);
	}
	warranty = warranty*30*24*60*60;
	let fd = new FormData();
	fd.append("store_id", storeID);
	fd.append("code", code);
	fd.append("brand", brand);
	fd.append("type", type);
	fd.append("maker", maker);
	fd.append("description", description);
	fd.append("production_date", productionDate);
	fd.append("expiry_date", expiry);
	fd.append("warranty_time", warranty);
	fd.append("purchase_code", purchaseCode);
	fd.append("purchase_date", purchaseDate);
	fd.append("store_name", storeName);
	fd.append("store_phone_email", storePhoneEmail);
	fd.append("service_status", serviceStatus);
	fd.append("lat", lat);
	fd.append("lng", lng);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/add_product",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}

function cancel() {
	if (confirm("Apakah Anda yakin ingin membatalkan perubahan")) {
		window.history.back();
	}
}
