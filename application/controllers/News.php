<?php

class News extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('news', array(
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
				$this->load->view('news/add', array(
					'adminID' => $adminID
				));
			} else {
				header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/news');
			}
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function edit() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$newsID = intval($this->input->post('id'));
			$role = intval($this->db->query("SELECT * FROM `admins` WHERE `id`=" . $adminID)->row_array()['role']);
			if ($role == 1) {
				$this->load->view('news/edit', array(
					'adminID' => $adminID,
					'newsID' => $newsID
				));
			} else {
				header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/news');
			}
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}
}
