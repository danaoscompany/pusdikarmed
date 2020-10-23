<?php

class User extends CI_Controller {

	public function index() {
		$this->load->view('user');
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
			if ($user['first_access'] == NULL || $user['first_access'].trim() == '') {
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
        	echo "UPLOAD FAILED: "+json_encode($this->upload->display_errors());
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
		$userID = intval($this->input->post('user_id'));
		$date = $this->input->post('date');
		$this->db->query("UPDATE `users` SET `last_access`='" . $date . "' WHERE `id`=" . $userID);
		echo json_encode($this->db->query("SELECT * FROM `petadik` ORDER BY `title`")->result_array());
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
}
