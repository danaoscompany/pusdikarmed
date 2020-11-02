<?php

class Test extends CI_Controller {

	public function index() {
		$this->session->set_userdata('user_id', 123);
		$this->load->view('test');
	}
}
