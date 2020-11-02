<?php

class Logout extends CI_Controller {

	public function index() {
		$this->session->set_userdata('logged_in', false);
		$this->session->set_userdata('user_id', 0);
		header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/main');
	}
}
