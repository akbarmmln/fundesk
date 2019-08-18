<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_setting extends CI_Model{
	
	function data()
	{
		$this->load->database();
		$sql = "SELECT * FROM setting ORDER BY st_id ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  	}

  	function update($nl, $alt, $notelp, $em, $pxp, $prp, $id)
  	{
		$this->load->database();
		$sql = "UPDATE setting SET nama_lembaga='".$nl."', alamat='".$alt."', telepon='".$notelp."', 
                email='".$em."', poin_xp='".$pxp."', poin_rp = '".$prp."' WHERE st_id='".$id."'";
    	$query = $this->db->query($sql);
    	return $query;
  	}
}
?>