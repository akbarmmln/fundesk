<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller{

	function __construct()
	{
		parent::__construct();
		$this->load->model('api_login');
		$this->load->model('api_users');
		$this->load->library('user_agent');
	}

	function index()
	{
		if($this->session->userdata('login') != "logged")
		{
			$this->load->view('HalamanLogin/form_login');
		}
		else
		{
			echo "<script>alert('Anda dalam keadaan login'); window.location.href='".base_url('app')."';</script>";
		}
	}
	
	function pdaftar()
	{
		$username = $this->input->post('username');
		$fn = $this->input->post('fn');
		$ln = $this->input->post('ln');
		$email = $this->input->post('email');
		$password = $this->input->post('password');

		$cekUsername = $this->api_users->cekUsername($username);
		if($cekUsername >= 1)
		{
			echo "<script>alert('Username sudah terdaftar'); window.location.href='javascript:history.back(-1)';</script>";
		}
		else
		{
			$result = $this->api_users->pdaftar($username, $password, $fn, $ln, $email);
			if($result)
			{
				echo "<script>alert('Pendaftaran berhasil'); window.location.href='".base_url('')."';</script>";
			}
			else
			{
				echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function daftar()
	{
		$this->load->view('HalamanLogin/daftar');
	}

	function logout()
	{
		$this->session->sess_destroy();
		echo "<script>window.location.href='".base_url('login')."';</script>";
	}
	
	function proseslogin()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		
		if($username == "")
		{
			echo "<script>alert('Username harus diisi'); window.location.href='".base_url('login')."';</script>";
		}
		else if($password == "")
		{
			echo "<script>alert('Password harus diisi'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{			
			$result = $this->api_login->proseslogin($username);
			if($result['hasil'] > 0)
			{
				foreach($result['data'] as $isidata)
				{
					$dataLogin = array(
						'user_id' => $isidata->user_id,
						'user_name' => $isidata->user_name,
						'user_akses' => $isidata->level
					);
				}

				$this->session->set_userdata($dataLogin);
				
				if(($username == $dataLogin['user_name']) && ($password == $result['data'][0]->user_pass))
				{
					$status_sess_login = array('login'=>'logged');
					$this->session->set_userdata($status_sess_login);
					echo "<script>alert('Login Berhasil'); window.location.href='".base_url('app')."';</script>";
				}
				else
				{
					echo "<script>alert('Username dan Password salah'); window.location.href='".base_url('login')."';</script>";
				}
			}
			else if($result['hasil'] <= 0)
			{
				echo "<script>alert('Username dan Password salah'); window.location.href='".base_url('login')."';</script>";
			}			
			else
			{
				echo "<script>alert('Server tidak menanggapi'); window.location.href='".base_url('login')."';</script>";
			}
		}
	}
}
?>