$(document).ready(function() {
	$("#premium").on("change", function() {
		var premiumIndex = $("#premium").prop('selectedIndex');
		if (premiumIndex == 1) {
			$("#premium-start-container").css("display", "block");
		} else {
			$("#premium-start-container").css("display", "none");
		}
	});
	/*$("#role").prop('selectedIndex', 1);
	$("#email").val("pengguna100@gmail.com");
	$("#password").val("HaloDunia123");
	$("#first-name").val("User");
	$("#last-name").val("Seratus");
	$("#phone").val("08198192892");
	$("#address").val("Address 100");
	$("#city").val("City 100");
	$("#province").val("Province 100");
	$("#company-name").val("Company Name 100");
	$("#company-city").val("Company City 100");
	$("#company-country").val("Company Country 100");
	$("#company-street").val("Company Street 100");
	$("#company-zip").val("Company ZIP 100");
	$("#company-state").val("Company State 100");
	$("#company-phone").val("Company Phone 100");*/
	var adminID = parseInt($("#admin-id").val().trim());
	let fd = new FormData();
	fd.append("id", adminID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_by_id",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			var obj = JSON.parse(response);
			$("#admin-name").html(obj['name']);
			$("#admin-email").html(obj['email']);
		}
	});
});

function addUser() {
	let email = $("#email").val().trim();
	let password = $("#password").val().trim();
	let name = $("#name").val().trim();
	let phone = $("#phone").val().trim();
	let birthday = $("#birthday").val().trim();
	let position = parseInt($("#positions").prop('selectedIndex'));
    if (email == "" || password == "" || name == "" || phone == "" || birthday == "" || position == 0) {
        alert("Mohon lengkapi data");
        return;
    }
    let role = "customer";
    if (position == 2) {
    	role = "store";
	} else if (position == 3) {
		role = "owner";
	}
    let fd = new FormData();
    fd.append("role", role);
    fd.append("email", email);
    fd.append("password", password);
	fd.append("name", name);
	fd.append("phone", phone);
	fd.append("birthday", birthday);
    $.ajax({
        type: 'POST',
        url: PHP_URL+"/admin/add_user",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(response) {
            var obj = JSON.parse(response);
            var responseCode = parseInt(obj['response_code']);
            if (responseCode == -1) {
                alert("Email sudah digunakan");
            } else if (responseCode == -2) {
				alert("Nomor HP sudah digunakan");
			} else {
                window.history.back();
            }
        }
    });
}

function cancelEditing() {
	window.history.back();
}
