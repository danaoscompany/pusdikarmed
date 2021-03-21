<?php

class User extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('user', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/login');
		}
	}
	
	public function get_product_buyers() {
		$productCode = $this->input->post('product_code');
		$storeID = intval($this->input->post('store_id'));
		$this->db->where('product_code', $productCode)->where('store_id', $storeID);
		echo json_encode($this->db->get('product_buyers')->result_array());
	}
	
	public function get_stores() {
		echo json_encode($this->db->get('stores')->result_array());
	}
	
	public function get_product_sellers() {
		$productCode = $this->input->post('product_code');
		$length = intval($this->input->post('length'));
		$cmd = "SELECT * FROM `store_products` WHERE `product_code`='" . $productCode . "' ";
		if ($length != -1) {
			$cmd .= "LIMIT 0," . $length;
		}
		$storeProducts = $this->db->query($cmd)->result_array();
		$stores = [];
		for ($i=0; $i<sizeof($storeProducts); $i++) {
			$storeProduct = $storeProducts[$i];
			$storeID = intval($storeProduct['store_id']);
			$this->db->where('id', $storeID);
			array_push($stores, $this->db->get('stores')->row_array());
		}
		echo json_encode($stores);
	}
	
	public function is_user_buying_product() {
		$productCode = $this->input->post('product_code');
		$userID = intval($this->input->post('user_id'));
		$products = $this->db->query("SELECT * FROM `product_buyers` WHERE `user_id`=" . $userID . " AND `product_code`='" . $productCode . "'")->result_array();
		if (sizeof($products) > 0) {
			echo 1;
		} else {
			echo 0;
		}
	}
	
	public function get_product_buyer() {
		$productCode = $this->input->post('product_code');
		$userID = intval($this->input->post('user_id'));
		$products = $this->db->query("SELECT * FROM `product_buyers` WHERE `user_id`=" . $userID . " AND `product_code`='" . $productCode . "'")->result_array();
		echo json_encode($products[0]);
	}
	
	public function add_buyer() {
		$storeID = intval($this->input->post('store_id'));
		$userID = intval($this->input->post('user_id'));
		$name = $this->input->post('name');
		$phone = $this->input->post('phone');
		$productCode = $this->input->post('product_code');
		$purchaseCode = $this->input->post('purchase_code');
		$purchaseDate = $this->input->post('purchase_date');
		$storeName = $this->input->post('store_name');
		$storePhoneEmail = $this->input->post('store_phone_email');
		$warrantyTime = $this->input->post('warranty_time');
		$serviceStatus = $this->input->post('service_status');
		$this->db->insert('product_buyers', array(
			'store_id' => $storeID,
			'user_id' => $userID,
			'name' => $name,
			'phone' => $phone,
			'product_code' => $productCode,
			'purchase_code' => $purchaseCode,
			'purchase_date' => $purchaseDate,
			'store_name' => $storeName,
			'store_phone_email' => $storePhoneEmail,
			'warranty_time' => $warrantyTime,
			'service_status' => $serviceStatus
		));
	}
	
	public function reset_password() {
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$this->db->where('email', $email);
		$this->db->update('users', array(
			'password' => $password
		));
	}
	
	public function delete_buyer_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$this->db->delete('product_buyers');
	}
	
	public function get_store_by_user_id() {
		$userID = intval($this->input->post('user_id'));
		$this->db->where('user_id', $userID);
		echo json_encode($this->db->get('stores')->row_array());
	}

	public function add() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('user/add', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/login');
		}
	}

	public function edit() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$userID = intval($this->input->post('user_id'));
			$this->load->view('user/edit', array(
				'adminID' => $adminID,
				'userID' => $userID
			));
		} else {
			header("Location: http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/login");
		}
	}

	public function get_nearest_stores() {
		$lat = doubleval($this->input->post('lat'));
		$lng = doubleval($this->input->post('lng'));
		$stores = $this->db->query("SELECT *, SQRT(POW(69.1 * (lat - " . $lat . "), 2) + POW(69.1 * (" . $lng . " - lng) * COS(lat / 57.3), 2)) AS distance FROM `stores` HAVING distance < 25 ORDER BY distance;")->result_array();
		echo json_encode($stores);
	}

	public function get_banners() {
		echo json_encode($this->db->query("SELECT * FROM `banners`")->result_array());
	}
	
	public function update_profile() {
		$userID = intval($this->input->post('id'));
		$name = $this->input->post('name');
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$phone = $this->input->post('phone');
		$birthday = $this->input->post('birthday');
		$this->db->where('id', $userID);
		$this->db->update('users', array(
			'name' => $name,
			'email' => $email,
			'password' => $password,
			'phone' => $phone,
			'birthday' => $birthday
		));
	}
	
	public function get_news() {
		$this->db->from('news');
		$this->db->order_by('date', 'asc');
		echo json_encode($this->db->get()->result_array());
	}
	
	public function get_admin_settings() {
		echo json_encode($this->db->get('settings')->row_array());
	}
	
	public function get_product_by_code() {
		$code = $this->input->post('code');
		$this->db->where('code', $code);
		$products = $this->db->get('products')->result_array();
		if (sizeof($products) > 0) {
			$this->db->where('product_code', $code);
			$products[0]['images'] = $this->db->get('product_images')->result_array();
		} else {
		}
		echo json_encode($products);
	}

	public function signup() {
		$name = $this->input->post('name');
		$email = $this->input->post('email');
		$phone = $this->input->post('phone');
		$password = $this->input->post('password');
		$birthday = $this->input->post('birthday');
		if ($this->db->query("SELECT * FROM `users` WHERE `email`='" . $email . "'")->num_rows() > 0) {
			echo json_encode(array(
				'response_code' => -1
			));
			return;
		}
		if ($this->db->query("SELECT * FROM `users` WHERE `phone`='" . $phone . "'")->num_rows() > 0) {
			echo json_encode(array(
				'response_code' => -2
			));
			return;
		}
		$this->db->insert('users', array(
			'name' => $name,
			'email' => $email,
			'phone' => $phone,
			'password' => $password,
			'birthday' => $birthday
		));
		$id = intval($this->db->insert_id());
		echo json_encode(array(
			'response_code' => 1,
			'user_id' => $id
		));
	}

	public function get_documents() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		$category = $this->input->post('category');
		echo json_encode($this->db->query("SELECT * FROM `documents` WHERE `type`='" . $category . "'")->result_array());
	}

	public function get_videos() {
		$videos = $this->db->query("SELECT * FROM `videos` ORDER BY `name`")->result_array();
		echo json_encode($videos);
	}

	public function get_user_by_id() {
		$userID = intval($this->input->post('id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		$users = $this->db->query("SELECT * FROM `users` WHERE `id`=" . $userID)->result_array();
		if (sizeof($users) > 0) {
			$user = $users[0];
			if ($user['first_access'] == NULL || trim($user['first_access']) == '') {
				$this->db->query("UPDATE `users` SET `first_access`='" . $date . "' WHERE `id`=" . $userID);
			}
			$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
			$user['response_code'] = 1;
			echo json_encode($user);
		} else {
			echo json_encode(array(
				'response_code' => -1
			));
		}
	}

	public function get_user_info_by_email() {
		$email = $this->input->post('email');
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `email`='" . $email . "'");
		$users = $this->db->query("SELECT * FROM `users` WHERE `email`='" . $email . "'")->result_array();
		if (sizeof($users) > 0) {
			$user = $users[0];
			if ($user['first_access'] == NULL || trim($user['first_access']) == '') {
				$this->db->query("UPDATE `users` SET `first_access`='" . $date . "' WHERE `email`='" . $email . "'");
			}
			$user['response_code'] = 1;
			echo json_encode($user);
		} else {
			echo json_encode(array(
				'response_code' => -1
			));
		}
	}

	public function upload_test() {
		$config['upload_path'] = './userdata/';
		$config['allowed_types']        = '*';
		$config['max_size']             = 100;
		$config['max_width']            = 8192;
		$config['max_height']           = 8192;
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			echo "UPLOAD SUCCESS, PATH: " . $this->upload->data()['file_name'];
		} else {
			echo "UPLOAD FAILED: " . json_encode($this->upload->display_errors());
		}
	}

	public function send_image() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$config['upload_path'] = './userdata/';
		$config['allowed_types']        = '*';
		$config['max_size']             = 100;
		$config['max_width']            = 8192;
		$config['max_height']           = 8192;
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$this->db->insert('messages', array(
				'user_id' => $userID,
				'message' => '',
				'image' => $this->upload->data()['file_name'],
				'type' => 'image',
				'date' => $date
			));
			$lastMessageID = intval($this->db->insert_id());
			$messageObj = $this->db->query("SELECT * FROM `messages` WHERE `id`=" . $lastMessageID)->row_array();
			$messageObj['user_name'] = $user['first_name'] . " " . $user['last_name'];
			$messageObj['profile_picture'] = $user['profile_picture'];
			echo json_encode($messageObj);
		}
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
	}

	public function get_kaldik() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		$year = intval($this->input->post('year'));
		$documents = $this->db->query("SELECT * FROM `documents` WHERE `year`=" . $year . " AND `type`='kaldik'")->result_array();
		echo json_encode($documents);
	}

	public function login() {
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$users = $this->db->query("SELECT * FROM `users` WHERE `username`='" . $username . "'")->result_array();
		if (sizeof($users) > 0) {
			$user = $users[0];
			if ($user['password'] == $password) {
				echo json_encode(array(
					'response_code' => 1,
					'id' => intval($user['id'])
				));
			} else {
				echo json_encode(array(
					'response_code' => -1
				));
			}
		} else {
			echo json_encode(array(
				'response_code' => -2
			));
		}
	}

	public function get_petadik_documents() {
		echo json_encode($this->db->query("SELECT * FROM `petadik`")->result_array());
	}

	public function get_petadik_document() {
		$title = $this->input->post('title');
		echo json_encode($this->db->query("SELECT * FROM `petadik` WHERE `title`='" . $title . "'")->row_array());
	}

	public function get_perwira_documents() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		echo json_encode($this->db->query("SELECT * FROM `documents` WHERE `type`='pa' ORDER BY `name`")->result_array());
	}

	public function get_bintara_documents() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		echo json_encode($this->db->query("SELECT * FROM `documents` WHERE `type`='ba' ORDER BY `name`")->result_array());
	}

	public function get_tamtama_documents() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		echo json_encode($this->db->query("SELECT * FROM `documents` WHERE `type`='ta' ORDER BY `name`")->result_array());
	}

	public function send_message() {
		$userID = intval($this->input->post('user_id'));
		$message = $this->input->post('message');
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		$user = $this->db->query("SELECT * FROM `users` WHERE `id`=" . $userID)->row_array();
		$this->db->insert('messages', array(
			'user_id' => $userID,
			'message' => $message,
			'type' => 'text',
			'date' => $date
		));
		$lastMessageID = intval($this->db->insert_id());
		$messageObj = $this->db->query("SELECT * FROM `messages` WHERE `id`=" . $lastMessageID)->row_array();
		$messageObj['user_name'] = $user['first_name'] . " " . $user['last_name'];
		$messageObj['profile_picture'] = $user['profile_picture'];
		echo json_encode($messageObj);
		$url = 'https://fcm.googleapis.com/fcm/send';
		$fields = array (
			'to'  => '/topics/chat',
			'data' => array (
				"user_id" => "" . $userID,
				"message" => $message,
				"date" => $date
			)
		);
		$fields = json_encode ( $fields );
		$headers = array (
			'Authorization: key=' . "AAAAapcJ--o:APA91bGcHymHYWuzrkPTUA97i9RnXv0w570M6LaTkJJG7gDjn0Acz97DI2h7vY-yXA5ye8H4O26sAMon3mkNtSYOpmeiQKBmXEsPhWoTkAOOjpGgYAphjPpwkuAT-WuEaOxQyIBkgFKF",
			'Content-Type: application/json'
		);
		$ch = curl_init ();
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_POST, true );
		curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );
		$result = curl_exec ( $ch );
		curl_close ( $ch );
	}

	public function get_users() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		echo json_encode($this->db->query("SELECT * FROM `users` ORDER BY `first_name`")->result_array());
	}

	public function get_messages() {
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		$messages = $this->db->query("SELECT * FROM `messages`")->result_array();
		for ($i=0; $i<sizeof($messages); $i++) {
			$userID = intval($messages[$i]['user_id']);
			$user = $this->db->query("SELECT * FROM `users` WHERE `id`=" . $userID)->row_array();
			if ($userID != 0) {
				$messages[$i]['user_name'] = $user['first_name'] . " " . $user['last_name'];
				$messages[$i]['profile_picture'] = $user['profile_picture'];
			}
		}
		echo json_encode($messages);
	}
	
	public function get_pusdikarmed_profile() {
		echo json_encode($this->db->query("SELECT * FROM `profile` WHERE `type`='pusdikarmed_profile'")->row_array());
	}
	
	public function get_about_pia() {
		echo json_encode($this->db->query("SELECT * FROM `profile` WHERE `type`='about_p_i_a'")->row_array());
	}
	
	public function get_tutorial_video() {
		echo json_encode($this->db->query("SELECT * FROM `profile` WHERE `type`='tutorial_video'")->row_array());
	}
	
	public function get_kaldik_document() {
		$year = intval($this->input->post('year'));
		echo json_encode($this->db->query("SELECT * FROM `kaldik` WHERE `year`=" . $year)->row_array());
	}
	
	public function get_kurdik_documents() {
		$type = $this->input->post('type');
		echo json_encode($this->db->query("SELECT * FROM `kurdik` WHERE `type`='" . $type . "'")->result_array());
	}
	
	public function get_kurdik_document() {
		$type = $this->input->post('type');
		$title = $this->input->post('title');
		echo json_encode($this->db->query("SELECT * FROM `kurdik` WHERE `type`='" . $type . "' AND `title`='" . $title . "'")->row_array());
	}
	
	public function get_nilai_documents() {
		$type = $this->input->post('type');
		echo json_encode($this->db->query("SELECT * FROM `nilai` WHERE `type`='" . $type . "'")->result_array());
	}
	
	public function get_nilai_document() {
		$type = $this->input->post('type');
		$title = $this->input->post('title');
		echo json_encode($this->db->query("SELECT * FROM `nilai` WHERE `type`='" . $type . "' AND `title`='" . $title . "'")->row_array());
	}

	public function get_gumil_documents() {
		$type = $this->input->post('type');
		echo json_encode($this->db->query("SELECT * FROM `gumil` WHERE `type`='" . $type . "'")->result_array());
	}

	public function get_gumil_document() {
		$type = $this->input->post('type');
		$title = $this->input->post('title');
		echo json_encode($this->db->query("SELECT * FROM `gumil` WHERE `type`='" . $type . "' AND `title`='" . $title . "'")->row_array());
	}
}
