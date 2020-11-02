<?php

class Main extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/user');
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/login');
		}
	}
}
