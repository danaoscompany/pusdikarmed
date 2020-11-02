<?php

class Banner extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('banner', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function view_banner() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$bannerID = $this->input->post('id');
			$this->load->view('banner/view', array(
				'adminID' => $adminID,
				'bannerID' => $bannerID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}
}
