<?php

class Document extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('document', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function add() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('document/add', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function edit() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$id = intval($this->input->post('id'));
			$this->load->view('document/edit', array(
				'adminID' => $adminID,
				'id' => $id
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}
}
