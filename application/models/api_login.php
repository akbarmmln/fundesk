<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_login extends CI_Model{
	
	function proseslogin($data)
	{
		$this->load->database();
		$sql = "SELECT * FROM users WHERE user_name = '".$data."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}
}
?>