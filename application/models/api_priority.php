<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_priority extends CI_Model{
	
	function dataPriority()
	{
		$this->load->database();
		$sql = "SELECT * FROM ref_priority ORDER BY id_priority ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  }

	function findPriority($idprio)
  {
		$this->load->database();
		$sql = "SELECT * FROM ref_priority WHERE id_priority = '".$idprio."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  }

  function createPriority($prio)
  {
		$this->load->database();
		$sql = "INSERT INTO ref_priority (priority) VALUES ('".$prio."')";
		$query = $this->db->query($sql);
  	return $query;
  }

  function updatePriority($id, $prio)
  {
		$this->load->database();
		$sql = "UPDATE ref_priority SET priority='".$prio."' WHERE id_priority='".$id."'";
		$query = $this->db->query($sql);
    return $query;
  }

  function deletePriority($id)
  {
		$this->load->database();
		$sql = "DELETE FROM ref_priority WHERE id_priority='".$id."'";
		$query = $this->db->query($sql);
    return $query;
  }
}
?>