<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_users extends CI_Model{
	
	function ranking()
	{
		$this->load->database();
		$sql = "SELECT user_first_name, user_last_name, poin_rp, levels, badges FROM users ORDER BY poin_rp DESC LIMIT 50";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function dataUsers()
	{
		$this->load->database();
		$sql = "SELECT * FROM users ORDER BY user_id ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  	}
	
	function getUserTask()
	{
		$this->load->database();
		$sql = "SELECT * FROM users WHERE level = '2' ORDER BY user_id ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function findUser($id)
	{
		$this->load->database();
		$sql = "SELECT * FROM users WHERE user_id = '".$id."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function pdaftar($username, $password, $firstname, $lastname, $em)
	{
	  $this->load->library('uuid');
	  $id = $this->uuid->v4();
	  $this->load->database();
	  $sql = "INSERT INTO users (user_id, level, user_name, user_pass, user_first_name, user_last_name, 
	  user_phone, user_email, address, poin_xp, poin_rp, levels, badges) VALUES ('".$id."', '3', '".$username."', '".$password."', '".$firstname."', '".$lastname."', '0', '".$em."', '', 0, 0, 1, 'Bronze')";
	  $query = $this->db->query($sql);
	  return $query;
	}

  	function createUser($username, $password, $firstname, $lastname, $notelp, $em, $alt, $statuser)
  	{
		$this->load->library('uuid');
		$id = $this->uuid->v4();
		$this->load->database();
		$sql = "INSERT INTO users (user_id, level, user_name, user_pass, user_first_name, user_last_name, 
        user_phone, user_email, address, poin_xp, poin_rp, levels, badges) VALUES ('".$id."', '".$statuser."', '".$username."', '".$password."', '".$firstname."', '".$lastname."', '".$notelp."', '".$em."', '".$alt."', 0, 0, 1, 'Bronze')";
    	$query = $this->db->query($sql);
    	return $query;
	}
	
	function updateUser($id, $nmf, $nml, $no, $em, $alt)
	{
		$this->load->database();
		$sql = "UPDATE users SET user_first_name='".$nmf."', user_last_name='".$nml."', user_phone='".$no."',
		user_email='".$em."', address='".$alt."' WHERE user_id='".$id."'"; 
    	$query = $this->db->query($sql);
    	return $query;
	}

	function deleteUser($id)
	{
		$this->load->database();
		$sql = "DELETE FROM users WHERE user_id='".$id."'"; 
    	$query = $this->db->query($sql);
    	return $query;
	}

	function cekUsername($username)
	{
		$this->load->database();
		$sql = "SELECT * FROM users WHERE user_name = '".$username."'"; 
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		return $hasil;
	}
}
?>