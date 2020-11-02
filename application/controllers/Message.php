<?php

class Message extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('message', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function add() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$role = intval($this->db->query("SELECT * FROM `admins` WHERE `id`=" . $adminID)->row_array()['role']);
			if ($role == 1) {
				$this->load->view('message/add', array(
					'adminID' => $adminID
				));
			} else {
				header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/message');
			}
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function view() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$messageID = intval($this->input->post('id'));
			$this->load->view('message/view', array(
				'adminID' => $adminID,
				'messageID' => $messageID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}
}
