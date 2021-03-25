<?php

class Test extends CI_Controller {

	public function index() {
		$this->session->set_userdata('user_id', 123);
		$this->load->view('test');
	}
	
	public function fcm() {
		$message = "Ini adalah pesan";
		$url = 'https://fcm.googleapis.com/fcm/send';
		$fields = array (
			'to'  => '/topics/chat',
			'notification' => array(
            	'title' => 'Pesan baru',
            	'body' => strlen($message)>100?substr($message, 0, 100)."...":$message
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
		echo json_encode($result);
	}
}
