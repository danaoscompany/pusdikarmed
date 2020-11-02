<?php

class Test2 extends CI_Controller {

	public function index() {
		$userID = $this->session->userdata('user_id');
		$this->load->view('test2', array(
			'userID' => $userID
		));
	}
}
