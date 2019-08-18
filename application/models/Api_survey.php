<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_survey extends CI_Model{
	
    function dataresponden()
    {
        $this->load->database();
		$sql = "SELECT * FROM responden ORDER BY id";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
    }

    function konversi($data)
    {
        if(round($data) < 25.00)
		{
			$mutulayanan = "D";
			$kinerjaunit = "Tidak Baik";
		}
		else if((round($data, 3) >= 25.00) && (round($data, 3) <= 43.75))
		{
			$mutulayanan = "D";
			$kinerjaunit = "Tidak Baik";
		}
		else if((round($data, 3) >= 43.76) && (round($data, 3) <= 62.50))
		{
			$mutulayanan = "C";
			$kinerjaunit = "Kurang Baik";
		}
		else if((round($data, 3) >= 62.51) && (round($data, 3) <= 81.25))
		{
			$mutulayanan = "B";
			$kinerjaunit = "Baik";
		}
		else if((round($data, 3) >= 81.26) && (round($data, 3) <= 100.00))
		{
			$mutulayanan = "A";
			$kinerjaunit = "Sangat Baik";
		}
		return array('mutu'=>$mutulayanan, 'kinerja'=>$kinerjaunit);
    }

    function isique($uraian)
    {
        $this->load->database();
		$sql = "SELECT * FROM isi_kuesioner WHERE uraian = '".$uraian."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
    }

    function all()
    {
        $this->load->database();
		$sql = "SELECT uraian FROM isi_kuesioner GROUP BY uraian ORDER BY id_kuesioner ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
    }
    
    function getUraian()
	{
		$this->load->database();
		$sql = "SELECT * FROM uraian_survey ORDER BY id ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
    }

    function ceksurvey($usrid)
    {
        $this->load->database();
		$sql = "SELECT * FROM responden WHERE user_id = '".$usrid."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		return array('hasil'=>$hasil);
    }

    function insurvey($isidk, $isk, $usrid)
    {
        $this->load->database();
        $this->load->library('uuid');
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);

        $uuid = $this->uuid->v4();
        $sqlres = "INSERT INTO responden(user_id) VALUES('".$usrid."')";
        $queryres = $this->db->query($sqlres);

        for($j=0; $j<count($isk); $j++)
        {
            $sql = "INSERT INTO isi_kuesioner(id, id_responden, id_kuesioner, uraian, kepuasaan)
                        VALUES('".$this->uuid->v4()."', '".$uuid."', '".$isidk[$j]."', (SELECT uraian FROM uraian_survey WHERE id = '".$isidk[$j]."'), '".$isk[$j]."')";
            $query = $this->db->query($sql);
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            return FALSE;
        } 
        else {
            $this->db->trans_commit();
            return TRUE;
        }
    }
}
?>