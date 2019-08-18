<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pageerror extends CI_Controller {
	
	function __construct(){
		parent::__construct();
	}

	function index()
	{
		echo "<script>window.location.href='".base_url('pageerror/pagenotfound')."';</script>";
	}
	
	function pagenotfound()
	{
		$this->load->view('clean404/404');
	}
}
?>