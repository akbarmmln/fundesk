<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Model{
	
	function proseslogin($data)
	{
		$this->load->database();
		$sql = "SELECT customer.id_customer, customer.nama, login.email, login.password, login.status FROM customer join login ON customer.id_customer = login.id_customer WHERE login.email = '".$data['email']."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}
}
?>