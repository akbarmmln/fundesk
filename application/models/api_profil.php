<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_profil extends CI_Model{
	
	function getProfil($id)
	{
		$this->load->database();
		$sql = "SELECT * FROM users WHERE user_id='".$id."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}
	
	function updateProfile($id, $nd, $na, $alt, $notelp, $em, $image1, $image2)
	{	
		if(empty($image1) && empty($image2))
		{
			$this->load->database();
			$sql = "UPDATE users SET user_first_name='".$nd."', user_last_name='".$na."', address='".$alt."', 
					user_phone='".$notelp."', user_email='".$em."' WHERE user_id='".$id."'";
			$query = $this->db->query($sql);
			return $query;
		}
		else if(!empty($image1) && empty($image2))
		{
			$this->load->database();
			$sql = "UPDATE users SET user_first_name='".$nd."', user_last_name='".$na."', address='".$alt."', 
					user_phone='".$notelp."', user_email='".$em."', image1='".$image1."' WHERE user_id='".$id."'";
			$query = $this->db->query($sql);
			return $query;
		}
		else if(!empty($image2) && empty($image1))
		{
			$this->load->database();
			$sql = "UPDATE users SET user_first_name='".$nd."', user_last_name='".$na."', address='".$alt."', 
					user_phone='".$notelp."', user_email='".$em."', image2='".$image2."' WHERE user_id='".$id."'";
			$query = $this->db->query($sql);
			return $query;
		}
		else
		{
			$this->load->database();
			$sql = "UPDATE users SET user_first_name='".$nd."', user_last_name='".$na."', address='".$alt."', 
					user_phone='".$notelp."', user_email='".$em."', image1='".$image1."', image2='".$image2."' WHERE user_id='".$id."'";
			$query = $this->db->query($sql);
			return $query;
		}
	}
}
?>