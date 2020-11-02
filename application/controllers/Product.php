<?php

class Product extends CI_Controller {

	public function index() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$this->load->view('product', array(
				'adminID' => $adminID
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function view_qr() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$productCode = $this->input->post('product_code');
			$this->load->view('product/view_qr', array(
				'adminID' => $adminID,
				'productCode' => $productCode
			));
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function add() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$role = intval($this->db->query("SELECT * FROM `admins` WHERE `id`=" . $adminID)->row_array()['role']);
			if ($role == 1 || $role == 2) {
				$this->load->view('product/add', array(
					'adminID' => $adminID
				));
			} else {
				header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/product');
			}
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}

	public function edit() {
		if ($this->session->logged_in == 1) {
			$adminID = $this->session->user_id;
			$productID = intval($this->input->post('id'));
			$role = intval($this->db->query("SELECT * FROM `admins` WHERE `id`=" . $adminID)->row_array()['role']);
			if ($role == 1 || $role == 2) {
				$this->load->view('product/edit', array(
					'adminID' => $adminID,
					'productID' => $productID
				));
			} else {
				header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/product');
			}
		} else {
			header('Location: http://pusdikarmed.kodiklat-tniad.mil.id/admin/login');
		}
	}
}
