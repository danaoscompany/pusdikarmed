<?php

class Admin extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('admin', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function get_stores() {
		$stores = $this->db->get('stores')->result_array();
		for ($i=0; $i<sizeof($stores); $i++) {
			$store = $stores[$i];
			$userID = intval($store['user_id']);
			$this->db->where('id', $userID);
			$user = $this->db->get('users')->row_array();
			$stores[$i]['email'] = $user['email'];
			$stores[$i]['password'] = $user['password'];
		}
		echo json_encode($stores);
	}

	public function delete_store_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$this->db->delete('stores');
	}

	public function get_store_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		echo json_encode($this->db->get('stores')->row_array());
	}

	public function add_store() {
		$userID = intval($this->input->post('user_id'));
		$name = $this->input->post('name');
		$phone = $this->input->post('phone');
		$description = $this->input->post('description');
		$lat = doubleval($this->input->post('lat'));
		$lng = doubleval($this->input->post('lng'));
		$this->db->insert('stores', array(
			'user_id' => $userID,
			'name' => $name,
			'phone' => $phone,
			'description' => $description,
			'lat' => $lat,
			'lng' => $lng
		));
	}

	public function update_store() {
		$id = intval($this->input->post('id'));
		$userID = intval($this->input->post('user_id'));
		$name = $this->input->post('name');
		$phone = $this->input->post('phone');
		$description = $this->input->post('description');
		$lat = doubleval($this->input->post('lat'));
		$lng = doubleval($this->input->post('lng'));
		$this->db->where('id', $id);
		$this->db->update('stores', array(
			'user_id' => $userID,
			'name' => $name,
			'phone' => $phone,
			'description' => $description,
			'lat' => $lat,
			'lng' => $lng
		));
	}

	public function add_banner() {
		$config = array(
			'upload_path' => './userdata/images',
			'allowed_types' => "gif|jpg|png|jpeg",
			'overwrite' => TRUE
		);
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$this->db->insert('banners', array(
				'img' => $this->upload->data()['file_name']
			));
		}
	}

	public function get_banners() {
		echo json_encode($this->db->get('banners')->result_array());
	}

	public function get_banner_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		echo json_encode($this->db->get('banners')->row_array());
	}

	public function delete_banner_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$this->db->delete('banners');
	}

	public function add() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('admin/add', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function add_admin() {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		if (sizeof($this->db->query("SELECT * FROM `admins` WHERE `email`='" . $email . "'")->result_array()) > 0) {
			echo -1;
		} else {
			$this->db->insert('admins', array(
				'name' => $name,
				'email' => $email,
				'password' => $password
			));
			echo 1;
		}
	}
	
	public function add_product() {
		$code = $this->input->post('code');
		$brand = $this->input->post('brand');
		$type = $this->input->post('type');
		$maker = $this->input->post('maker');
		$description = $this->input->post('description');
		$productionDate = $this->input->post('production_date');
		$expiryDate = $this->input->post('expiry_date');
		$warrantyTime = intval($this->input->post('warranty_time'));
		$purchaseCode = $this->input->post('purchase_code');
		$purchaseDate = $this->input->post('purchase_date');
		$storeID = intval($this->input->post('store_id'));
		$storeName = $this->input->post('store_name');
		$storePhoneEmail = $this->input->post('store_phone_email');
		$serviceStatus = $this->input->post('service_status');
		$lat = doubleval($this->input->post('lat'));
		$lng = doubleval($this->input->post('lng'));
		$this->db->insert('products', array(
			'code' => $code,
			'brand' => $brand,
			'type' => $type,
			'maker' => $maker,
			'description' => $description,
			'production_date' => $productionDate,
			'expiry_date' => $expiryDate,
			'warranty_time' => $warrantyTime,
			'purchase_code' => $purchaseCode,
			'purchase_date' => $purchaseDate,
			'store_id' => $storeID,
			'store_name' => $storeName,
			'store_phone_email' => $storePhoneEmail,
			'service_status' => $serviceStatus,
			'lat' => $lat,
			'lng' => $lng
		));
	}

	public function add_news() {
		$title = $this->input->post('title');
		$content = $this->input->post('content');
		$date = $this->input->post('date');
		$config = array(
			'upload_path' => './userdata/images',
			'allowed_types' => "gif|jpg|png|jpeg",
			'overwrite' => TRUE
		);
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$this->db->insert('news', array(
				'title' => $title,
				'content' => $content,
				'date' => $date,
				'img_url' => $this->upload->data()['file_name']
			));
		}
	}

	public function get_messages() {
		$this->db->from('messages');
		$this->db->order_by('date', 'desc');
		$messages = $this->db->get()->result_array();
		for ($i=0; $i<sizeof($messages); $i++) {
			$message = $messages[$i];
			$userID = intval($message['user_id']);
			if ($userID != -1) {
				$this->db->where('id', $userID);
				$user = $this->db->get('users')->row_array();
				$messages[$i]['user_name'] = $user['first_name'] . " " . $user['last_name'];
			}
		}
		echo json_encode($messages);
	}

	public function get_settings() {
		echo json_encode($this->db->get('settings')->row_array());
	}

	public function update_settings() {
		$email = $this->input->post('email');
		$phone = $this->input->post('phone');
		$tosURL = $this->input->post('tos_url');
		$privacyPolicyURL = $this->input->post('privacy_policy_url');
		$this->db->update('settings', array(
			'email' => $email,
			'phone' => $phone,
			'tos_url' => $tosURL,
			'privacy_policy_url' => $privacyPolicyURL
		));
	}

	public function get_message_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$message = $this->db->get('messages')->row_array();
		$user = $this->db->query("SELECT * FROM `users` WHERE `id`=" . $message['user_id'])->row_array();
		$message['sender'] = $user['first_name'] . " " . $user['last_name'];
		echo json_encode($message);
	}

	public function add_message() {
		$title = $this->input->post('title');
		$content = $this->input->post('content');
		$date = $this->input->post('date');
		$receiverID = intval($this->input->post('receiver_id'));
		$imageUploaded = intval($this->input->post('image_uploaded'));
		if ($imageUploaded == 1) {
			$config = array(
				'upload_path' => './userdata/images',
				'allowed_types' => "gif|jpg|png|jpeg",
				'overwrite' => TRUE
			);
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$this->db->insert('messages', array(
					'title' => $title,
					'description' => $content,
					'date' => $date,
					'img_url' => $this->upload->data()['file_name'],
					'receiver_id' => $receiverID
				));
			}
		} else {
			$this->db->insert('messages', array(
				'title' => $title,
				'description' => $content,
				'date' => $date,
				'receiver_id' => $receiverID
			));
		}
		$messageID = intval($this->db->insert_id());
		$this->db->where('id', $messageID);
		$message = $this->db->get('messages')->row_array();
		$this->db->where('id', $receiverID);
		$fcmID = $this->db->get('users')->row_array()['fcm_id'];
		$url = 'https://fcm.googleapis.com/fcm/send';
		$fields = array (
			'registration_ids' => array (
				$fcmID
			),
			'data' => array (
				'message' => $message
			),
			'notification' => array (
				'title' => $title,
				'body' => $content,
				'sound' => 'default'
			)
		);
		$fields = json_encode ( $fields );
		$headers = array (
			'Authorization: key=' . "AAAAH8CNE8g:APA91bFH8bhXRZFMqJwtyjDuOn47nm6sQu1hveZKQju-9zfoaRA2FswxzpEGZ_WwYUnYZmDQ1OxV_uLCVl0y65MDv_K9JCON2PTru3QSV_JybsX0ZuvrrXv-50ZxJ7PJ1PNcEih3TQxQ",
			'Content-Type: application/json'
		);
		$ch = curl_init ();
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_POST, true );
		curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );
		$result = curl_exec ( $ch );
	}

	public function update_message() {
		$id = intval($this->input->post('id'));
		$title = $this->input->post('title');
		$content = $this->input->post('content');
		$date = $this->input->post('date');
		$receiverID = intval($this->input->post('receiver_id'));
		$imageUploaded = intval($this->input->post('image_uploaded'));
		if ($imageUploaded == 1) {
			$config = array(
				'upload_path' => './userdata/images',
				'allowed_types' => "gif|jpg|png|jpeg",
				'overwrite' => TRUE
			);
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$this->db->where('id', $id);
				$this->db->update('messages', array(
					'title' => $title,
					'description' => $content,
					'date' => $date,
					'img_url' => $this->upload->data()['file_name'],
					'receiver_id' => $receiverID
				));
			}
		} else {
			$this->db->where('id', $id);
			$this->db->update('messages', array(
				'title' => $title,
				'description' => $content,
				'date' => $date,
				'receiver_id' => $receiverID
			));
		}
	}

	public function delete_message_by_id() {
		$id = intval($this->input->post('id'));
		$message = $this->db->get_where('messages', array(
			'id' => $id
		))->row_array();
		unlink("userdata/" . $message['image']);
		$this->db->where('id', $id);
		$this->db->delete('messages');
	}

	public function update_news() {
		$id = intval($this->input->post('id'));
		$title = $this->input->post('title');
		$content = $this->input->post('content');
		$date = $this->input->post('date');
		$imgChanged = intval($this->input->post('image_changed'));
		if ($imgChanged == 1) {
			$config = array(
				'upload_path' => './userdata/images',
				'allowed_types' => "gif|jpg|png|jpeg",
				'overwrite' => TRUE
			);
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$this->db->where('id', $id);
				$this->db->update('news', array(
					'title' => $title,
					'content' => $content,
					'date' => $date,
					'img_url' => $this->upload->data()['file_name']
				));
			}
		} else {
			$this->db->where('id', $id);
			$this->db->update('news', array(
				'title' => $title,
				'content' => $content,
				'date' => $date
			));
		}
	}

	public function get_news() {
		$this->db->from('news');
		$this->db->order_by('date', 'asc');
		echo json_encode($this->db->get()->result_array());
	}

	public function get_sellers() {
		$this->db->where('role', 'store');
		$sellers = $this->db->get('users')->result_array();
		echo json_encode($sellers);
	}

	public function update_product() {
		$id = intval($this->input->post('id'));
		$code = $this->input->post('code');
		$brand = $this->input->post('brand');
		$type = $this->input->post('type');
		$maker = $this->input->post('maker');
		$description = $this->input->post('description');
		$productionDate = $this->input->post('production_date');
		$expiryDate = $this->input->post('expiry_date');
		$warrantyTime = intval($this->input->post('warranty_time'));
		$purchaseCode = $this->input->post('purchase_code');
		$purchaseDate = $this->input->post('purchase_date');
		$storeName = $this->input->post('store_name');
		$storeID = intval($this->input->post('store_id'));
		$storePhoneEmail = $this->input->post('store_phone_email');
		$serviceStatus = $this->input->post('service_status');
		$lat = doubleval($this->input->post('lat'));
		$lng = doubleval($this->input->post('lng'));
		$this->db->where('id', $id);
		$this->db->update('products', array(
			'code' => $code,
			'brand' => $brand,
			'type' => $type,
			'maker' => $maker,
			'description' => $description,
			'production_date' => $productionDate,
			'expiry_date' => $expiryDate,
			'warranty_time' => $warrantyTime,
			'purchase_code' => $purchaseCode,
			'purchase_date' => $purchaseDate,
			'store_id' => $storeID,
			'store_name' => $storeName,
			'store_phone_email' => $storePhoneEmail,
			'service_status' => $serviceStatus,
			'lat' => $lat,
			'lng' => $lng
		));
	}

	public function get_product_by_id() {
		$productID = intval($this->input->post('id'));
		$this->db->where('id', $productID);
		echo json_encode($this->db->get('products')->row_array());
	}

	public function edit() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$editedAdminID = intval($this->input->post("id"));
			$this->load->view("admin/edit", array(
				'adminID' => $adminID,
				'editedAdminID' => $editedAdminID
			));
		} else {
			header("Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login");
		}
	}

	public function delete_product_by_id() {
		$productID = intval($this->input->post('id'));
		$this->db->where('id', $productID);
		$this->db->delete('products');
	}

	public function get_products() {
		echo json_encode($this->db->get('products')->result_array());
	}

	public function get_admins() {
		echo json_encode($this->db->get('admins')->result_array());
	}

	public function delete_admin_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$this->db->delete('admins');
	}

	public function login() {
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$this->db->where('email', $email);
		$users = $this->db->get('admins')->result_array();
		if (sizeof($users) > 0) {
			$user = $users[0];
			if ($user['password'] != $password) {
				echo json_encode(array('response_code' => -1));
			} else {
				$this->session->set_userdata(array(
					'logged_in' => 1,
					'user_id' => intval($user['id'])
				));
				echo json_encode(array('response_code' => 1));
			}
		} else {
			echo json_encode(array('response_code' => -2));
		}
	}

	public function get_users() {
		echo json_encode($this->db->get('users')->result_array());
	}

	public function get_documents() {
		echo json_encode($this->db->query("SELECT * FROM `documents` ORDER BY name ASC, year ASC")->result_array());
	}

	public function add_user() {
		$firstName = $this->input->post('first_name');
		$lastName = $this->input->post('last_name');
		$email = $this->input->post('email');
		$role = $this->input->post('role');
		$this->db->where('email', $email);
		$users = $this->db->get('users')->result_array();
		if (sizeof($users) > 0) {
			echo json_encode(array(
				'response_code' => -1
			));
			return;
		}
		$this->db->insert('users', array(
			'email' => $email,
			'first_name' => $firstName,
			'last_name' => $lastName,
			'role' => $role
		));
		echo json_encode(array(
			'response_code' => 1
		));
	}

	public function update_admin() {
		$adminID = intval($this->input->post('id'));
		$name = $this->input->post('name');
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$emailChanged = intval($this->input->post('email_changed'));
		if ($emailChanged == 1) {
			$this->db->where('email', $email);
			$users = $this->db->get('users')->result_array();
			if (sizeof($users) > 0) {
				echo json_encode(array(
					'response_code' => -1
				));
				return;
			}
		}
		$this->db->where('id', $adminID);
		$this->db->update('admins', array(
			'name' => $name,
			'email' => $email,
			'password' => $password
		));
		echo json_encode(array(
			'response_code' => 1
		));
	}

	public function update_user() {
		$id = intval($this->input->post('id'));
		$email = $this->input->post('email');
		$firstName = $this->input->post('first_name');
		$lastName = $this->input->post('last_name');
		$role = $this->input->post('role');
		$emailChanged = intval($this->input->post('email_changed'));
		$phoneChanged = intval($this->input->post('phone_changed'));
		if ($emailChanged == 1) {
			$this->db->where('email', $email);
			$users = $this->db->get('users')->result_array();
			if (sizeof($users) > 0) {
				echo json_encode(array(
					'response_code' => -1
				));
				return;
			}
		}
		$this->db->where('id', $id);
		$this->db->update('users', array(
			'email' => $email,
			'first_name' => $firstName,
			'last_name' => $lastName,
			'role' => $role
		));
		echo json_encode(array(
			'response_code' => 1
		));
	}

	public function get_news_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		echo json_encode($this->db->get('news')->row_array());
	}

	public function delete_user() {
		$id = intval($this->input->post('id'));
		unlink("userdata/" . $this->db->get_where('users', array('id' => $id))->row_array()['profile_picture']);
		$this->db->where('id', $id);
		$this->db->delete('users');
	}

	public function get_admin_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		echo json_encode($this->db->get('admins')->row_array());
	}

	public function get_user_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		echo json_encode($this->db->get('users')->row_array());
	}

	public function delete_news_by_id() {
		$id = intval($this->input->post('id'));
		$this->db->where('id', $id);
		$this->db->delete('news');
	}

	public function add_document() {
		$name = $this->input->post('name');
		$type = $this->input->post('type');
		$year = intval($this->input->post('year'));
		$config = array(
			'upload_path' => './userdata/' . $type . '/',
			'allowed_types' => "pdf",
			'overwrite' => TRUE,
			'file_name' => uniqid()
		);
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$this->db->insert('documents', array(
				'name' => $name,
				'path' => $type . "/" . $this->upload->data()['file_name'],
				'year' => $year,
				'type' => $type
			));
		} else {
			echo json_encode($this->upload->display_errors());
		}
	}

	public function update_document() {
		$id = intval($this->input->post('id'));
		$name = $this->input->post('name');
		$fileName = $this->input->post('file_name');
		$type = $this->input->post('type');
		$year = intval($this->input->post('year'));
		$config = array(
			'upload_path' => './userdata/' . $type . '/',
			'allowed_types' => "pdf",
			'overwrite' => TRUE,
			'file_name' => uniqid()
		);
		$documentChanged = intval($this->input->post('document_changed'));
		if ($documentChanged == 1) {
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$this->db->where('id', $id);
				$this->db->update('documents', array(
					'name' => $name,
					'file_name' => $fileName,
					'path' => $type . "/" . $this->upload->data()['file_name'],
					'year' => $year,
					'type' => $type
				));
			} else {
				echo json_encode($this->upload->display_errors());
			}
		} else {
			$this->db->where('id', $id);
			$this->db->update('documents', array(
				'name' => $name,
				'year' => $year,
				'type' => $type
			));
		}
	}

	public function delete_document() {
		$id = intval($this->input->post('id'));
		unlink("userdata/" . $this->db->get_where('documents', array('id' => $id))->row_array()['path']);
		$this->db->where('id', $id);
		$this->db->delete('documents');
	}

	public function delete_petadik_document() {
		$id = intval($this->input->post('id'));
		unlink("userdata/" . $this->db->get_where('petadik', array('id' => $id))->row_array()['path']);
		$this->db->where('id', $id);
		$this->db->delete('petadik');
	}

	public function get_document_by_id() {
		$id = intval($this->input->post('id'));
		echo json_encode($this->db->query("SELECT * FROM `documents` WHERE `id`=" . $id)->row_array());
	}

	public function get_petadik_document_by_id() {
		$id = intval($this->input->post('id'));
		echo json_encode($this->db->query("SELECT * FROM `petadik` WHERE `id`=" . $id)->row_array());
	}

	public function get_petadik_documents() {
		echo json_encode($this->db->query("SELECT * FROM `petadik` ORDER BY `title`")->result_array());
	}

	public function add_petadik_document() {
		$name = $this->input->post('name');
		$fileName = $this->input->post('file_name');
		$config = array(
			'upload_path' => './userdata/petadik',
			'allowed_types' => "pdf",
			'overwrite' => TRUE,
			'file_name' => uniqid()
		);
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$this->db->insert('petadik', array(
				'title' => $name,
				'file_name' => $fileName,
				'path' => "petadik/" . $this->upload->data()['file_name']
			));
		} else {
			echo json_encode($this->upload->display_errors());
		}
	}

	public function update_petadik_document() {
		$id = intval($this->input->post('id'));
		$name = $this->input->post('name');
		$documentChanged = intval($this->input->post('document_changed'));
		if ($documentChanged == 1) {
			$fileName = $this->input->post('file_name');
			$config = array(
				'upload_path' => './userdata/petadik',
				'allowed_types' => "pdf",
				'overwrite' => TRUE,
				'file_name' => uniqid()
			);
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$this->db->where('id', $id);
				$this->db->update('petadik', array(
					'title' => $name,
					'file_name' => $fileName,
					'path' => "petadik/" . $this->upload->data()['file_name']
				));
			} else {
				echo json_encode($this->upload->display_errors());
			}
		} else {
			$this->db->where('id', $id);
			$this->db->update('petadik', array(
				'title' => $name
			));
			echo "UPDATE petadik SET title='" . $name . "' WHERE id=" . $id;
		}
	}

	public function get_videos() {
		echo json_encode($this->db->query("SELECT * FROM `videos` ORDER BY `name`")->result_array());
	}

	public function delete_video() {
		$id = intval($this->input->post('id'));
		unlink("userdata/" . $this->db->get_where('videos', array('id' => $id))->row_array()['path']);
		$this->db->query("DELETE FROM `videos` WHERE `id`=" . $id);
	}

	public function add_video() {
		$name = $this->input->post('name');
		$fileName = $this->input->post('file_name');
		$duration = doubleval($this->input->post('duration'));
		$config = array(
			'upload_path' => './userdata/videos/',
			'allowed_types' => "mp4",
			'overwrite' => TRUE,
			'file_name' => uniqid()
		);
		$this->load->library('upload', $config);
		if ($this->upload->do_upload('file')) {
			$videoPath = 'videos/' . $this->upload->data()['file_name'];
			$thumbnailPath = "thumbnails/" . uniqid() . ".jpg";
			$thumbnailData = $this->input->post('thumbnail');
			$thumbnailData = explode(';', $thumbnailData)[1];
			$thumbnailData = explode(',', $thumbnailData)[1];
			$f = fopen("userdata/" . $thumbnailPath, "w");
			fwrite($f, base64_decode($thumbnailData));
			fflush($f);
			fclose($f);
			$this->db->insert('videos', array(
				'name' => $name,
				'file_name' => $fileName,
				'path' => $videoPath,
				'thumbnail' => $thumbnailPath,
				'duration' => $duration
			));
		} else {
			echo json_encode($this->upload->display_errors());
		}
	}

	public function update_video() {
		$id = intval($this->input->post('id'));
		$name = $this->input->post('name');
		$fileName = $this->input->post('file_name');
		$duration = doubleval($this->input->post('duration'));
		$videoChanged = intval($this->input->post('video_changed'));
		if ($videoChanged == 1) {
			$config = array(
				'upload_path' => './userdata/videos/',
				'allowed_types' => "mp4",
				'overwrite' => TRUE,
				'file_name' => uniqid()
			);
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('file')) {
				$videoPath = 'videos/' . $this->upload->data()['file_name'];
				$thumbnailPath = "thumbnails/" . uniqid() . ".jpg";
				$thumbnailData = $this->input->post('thumbnail');
				$thumbnailData = explode(';', $thumbnailData)[1];
				$thumbnailData = explode(',', $thumbnailData)[1];
				$f = fopen("userdata/" . $thumbnailPath, "w");
				fwrite($f, base64_decode($thumbnailData));
				fflush($f);
				fclose($f);
				$this->db->where('id', $id);
				$this->db->update('videos', array(
					'name' => $name,
					'file_name' => $fileName,
					'path' => $videoPath,
					'thumbnail' => $thumbnailPath,
					'duration' => $duration
				));
			} else {
				echo json_encode($this->upload->display_errors());
			}
		} else {
			$this->db->where('id', $id);
			$this->db->update('videos', array(
				'name' => $name
			));
			echo "UPDATE videos SET name='" . $name . "' WHERE id=" . $id;
		}
	}

	public function get_video_by_id() {
		$id = intval($this->input->post('id'));
		echo json_encode($this->db->query("SELECT * FROM `videos` WHERE `id`=" . $id)->row_array());
	}
}
