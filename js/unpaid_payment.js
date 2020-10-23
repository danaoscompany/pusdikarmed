var adminID = 0;
var users = [];
var payments = [];
var selectedPaymentIndex = 0;

$(document).ready(function() {
	adminID = parseInt($("#admin-id").val());
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
	getUsers();
});

function getUsers() {
	users = [];
	$("#users").find("*").remove();
	$("#users").on('change', function() {
		var selectedIndex = parseInt($("#users").prop('selectedIndex'));
		if (selectedIndex > 0) {
			selectedIndex--;
			var user = users[selectedIndex];
			getPayments(parseInt(user['id']));
		} else {
			$("#payments").find("*").remove();
		}
	});
	let fd = new FormData();
	fd.append("start", 0);
	fd.append("length", -1);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/admin/get_all_users_with_length",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			users = JSON.parse(response);
			$("#users").append("<option>--- Choose User ---</option>");
			for (var i=0; i<users.length; i++) {
				var user = users[i];
				$("#users").append("<option>"+user['first_name']+" "+user['last_name']+"</option>");
			}
			if (users.length > 0) {
				$("#users option").eq(1).prop('selected', true);
				getPayments(parseInt(users[0]['id']));
			}
		}
	});
}

function getPayments(userID) {
	payments = [];
	$("#payments").find("*").remove();
	let fd = new FormData();
	fd.append("user_id", userID);
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/payment/get_unpaid_payments",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			payments = JSON.parse(response);
			for (let i=0; i<payments.length; i++) {
				let payment = payments[i];
				let user = payment['user'];
				var name = user['first_name']+" "+user['last_name'];
				var type = "";
				if (payment['type'] == 'premium_purchase') {
					type = "Monhtly Premium Upgrade";
				}
				var status = "";
				if (payment['status'] == 'paid') {
					status = "PAID";
				} else if (payment['status'] == 'unpaid') {
					status = "UNPAID";
				}
				$("#payments").append("<tr>" +
					"                                        <th scope=\"row\">"+(i+1)+"</th>" +
					"                                        <td>"+name+"</td>" +
					"                                        <td>"+payment['amount']+"</td>" +
					"                                        <td>"+type+"</td>" +
					"                                        <td>"+payment['date']+"</td>" +
					"                                        <td>"+status+"</td>" +
					"                                        <td><button onclick='confirmDeletePayment("+i+")' class='btn-shadow p-1 btn btn-danger btn-sm show-toastr-example' data-toggle='modal' data-target='#confirm'>Delete</button></td>" +
					"                                    </tr>");
			}
		}
	});
}

function confirmDeletePayment(index) {
	selectedPaymentIndex = index;
	$("#confirmLabel").html("Delete Payment");
	$("#confirmBody").html("Are you sure you want to delete this payment?");
	$("#confirm").modal('show');
}

function deletePayment() {
	let fd = new FormData();
	fd.append("id", parseInt(payments[selectedPaymentIndex]['id']));
	$.ajax({
		type: 'POST',
		url: PHP_URL+"/payment/delete_payment_history",
		data: fd,
		processData: false,
		contentType: false,
		cache: false,
		success: function(response) {
			getPayments();
		}
	});
}
