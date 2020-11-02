var iconStyle;
var lat = -6.200000;
var lng = 106.816666;
var productID = 0;
var stores = [];
var selectedStoreID = 0;

$(document).ready(function() {
	productID = parseInt($("#product-id").val().trim());
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
			let fd = new FormData();
			fd.append("id", productID);
			$.ajax({
				type: 'POST',
				url: PHP_URL+"/admin/get_product_by_id",
				data: fd,
				processData: false,
				contentType: false,
				cache: false,
				success: function(response) {
					var product = JSON.parse(response);
					$("#code").val(product['code']);
					$("#brand").val(product['brand']);
					$("#type").val(product['type']);
					$("#maker").val(product['maker']);
					$("#description").val(product['description']);
					$("#production-date").val(product['production_date']);
					$("#expiry").val(product['expiry_date']);
					$("#purchase-code").val(product['purchase_code']);
					$("#purchase-date").val(product['purchase_date']);
					$("#store-name").val(product['store_name']);
					selectedStoreID = parseInt(product['store_id']);
					for (let j=0; j<stores.length; j++) {
						let store = stores[j];
						if (parseInt(store['id']) == selectedStoreID) {
							$("#stores").prop('selectedIndex', j+1);
							break;
						}
					}
					$("#store-phone-email").val(product['store_phone_email']);
					$("#warranty").val(parseInt(product['warranty_time'])/30/24/60/60);
					$("#service-status").val(product['service_status']);
					lat = parseFloat(product['lat']);
					lng = parseFloat(product['lng']);
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
				}
			});
		}
	});
});

function save() {
	var code = $("#code").val().trim();
	var brand = $("#brand").val().trim();
	var type = $("#type").val().trim();
	var maker = $("#maker").val().trim();
	var description = $("#description").val().trim();
	var productionDate = $("#production-date").val().trim();
	var expiry = $("#expiry").val().trim();
	var purchaseCode = $("#purchase-code").val().trim();
	var purchaseDate = $("#purchase-date").val().trim();
	var storeName = stores[$("#stores").prop('selectedIndex')-1]['name'];
	selectedStoreID = parseInt(stores[$("#stores").prop('selectedIndex')-1]['id']);
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
	fd.append("id", productID);
	fd.append("code", code);
	fd.append("brand", brand);
	fd.append("type", type);
	fd.append("maker", maker);
	fd.append("description", description);
	fd.append("production_date", productionDate);
	fd.append("expiry_date", expiry);
	fd.append("purchase_code", purchaseCode);
	fd.append("purchase_date", purchaseDate);
	fd.append("warranty_time", warranty);
	fd.append("store_name", storeName);
	fd.append("store_id", selectedStoreID);
	fd.append("store_phone_email", storePhoneEmail);
	fd.append("service_status", serviceStatus);
	fd.append("lat", lat);
	fd.append("lng", lng);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/update_product",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			window.history.back();
		}
	});
}
