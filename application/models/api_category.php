<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_category extends CI_Model{
	
	function dataCategory()
	{
		$this->load->database();
		$sql = "SELECT * FROM ref_categories ORDER BY id_category ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  }

  function findCategory($idcat)
  {
		$this->load->database();
		$sql = "SELECT * FROM ref_categories WHERE id_category = '".$idcat."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  }

  function createKat($kategori)
  {
		$this->load->database();
		$sql = "INSERT INTO ref_categories (category) VALUES ('".$kategori."')";
    $query = $this->db->query($sql);
    return $query;
  }

  function updateKat($id, $kategori)
  {
		$this->load->database();
		$sql = "UPDATE ref_categories SET category='".$kategori."' WHERE id_category='".$id."'";
    $query = $this->db->query($sql);
    return $query;
  }

  function deleteKat($id)
  {
		$this->load->database();
		$sql = "DELETE FROM ref_categories WHERE id_category='".$id."'";
    $query = $this->db->query($sql);
    return $query;
  }
}
?>