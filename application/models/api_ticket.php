<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_ticket extends CI_Model{
	
	function setting(){
		$this->load->database();
		$getSetting = "SELECT * FROM setting";
		$querySetting = $this->db->query($getSetting);
		$rowSetting = $querySetting->result();
		return $rowSetting;
	}

	function detaillastest($idticket)
	{
		$this->load->database();
		$sql1 = "SELECT * FROM problems WHERE tiket_number = '".$idticket."'";
		$query1 = $this->db->query($sql1);
		$row1 = $query1->result();
		$sql2 = "SELECT * FROM problem_history WHERE problem_id = '".$row1[0]->problem_id."' ORDER BY tanggal_kegiatan ASC";		
		$query2 = $this->db->query($sql2);
		$row2 = $query2->result();
		$data = array(
			'ticknum' => $row1[0]->tiket_number,
			'data'=> $row2
		);
		return json_encode($data);
	}

	function lastest($idssc)
	{
		$this->load->database();
		$sql = "SELECT * FROM problems WHERE reported_by = '".$idssc."' ORDER BY reported_date DESC LIMIT 5";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function createTicket($id_user, $by, $telp, $idcat, $site, $ps, $pd, $image)
	{
        date_default_timezone_set('Asia/Jakarta');
		$this->load->database();
        $this->load->library('uuid');
        $probid = $this->uuid->v4();
        $tiketnum = date("YHis" .gettimeofday()['usec']);
		$repdate = date('Y-m-d');
		$datetime = date('Y-m-d H:i:s');

		$sqlidadmin = "SELECT user_id FROM users WHERE level = 1 ORDER BY RAND() LIMIT 1";
		$queryidadmin = $this->db->query($sqlidadmin);
		$rowidadmin = $queryidadmin->result();
		
		$sql = "INSERT INTO problems (problem_id, tiket_number, id_category, reported_date, reported_by, telp, problem_summary, problem_detail, problem_site, problem_file, problem_status, open_by) 
            VALUES ('".$probid."', '".$tiketnum."', '".$idcat."', '".$datetime."', '".$id_user."', '".$telp."', '".$ps."', '".$pd."', '".$site."', '".$image."', 'New', '".$rowidadmin[0]->user_id."')";
		$query = $this->db->query($sql);

		$sql = "INSERT INTO problem_history (problem_history_id, problem_id, keterangan, tanggal_kegiatan) 
            VALUES ('".$this->uuid->v4()."', '".$probid."', 'Pembuatan Tiket Baru', '".$datetime."')";
		$query = $this->db->query($sql);
		return $query;
	}

	function allTicketByLev($idssc)
	{
		$this->load->database();
		$sql = "SELECT * FROM problems WHERE reported_by = '".$idssc."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function searchTicket($scid)
	{
		$this->load->database();
		$sql = "SELECT * FROM problems WHERE tiket_number = '".$scid."' OR problem_id='".$scid."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}
	
	function getNewNumber($useridadmin)
	{
		$this->load->database();
		$sql = "SELECT * FROM problems WHERE problem_status = 'New' AND open_by = '".$useridadmin."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		return array('hasil'=>$hasil);
	}

	function newTicket($id, $akses)
	{
		$this->load->database();

		if($akses == 1)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'New' AND open_by = '".$id."' ORDER BY reported_date ASC";
		}
		else if($akses == 2)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Switch Over' AND assign_to = '".$id."' ORDER BY reported_date ASC";
		}
		else
		{
			$sql = "SELECT * FROM problems WHERE (problem_status = 'New' OR problem_status = 'Switch Over') AND reported_by = '".$id."' ORDER BY reported_date ASC";
		}
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	// function switchoverTicket($id, $akses)
	// {
	// 	$this->load->database();

	// 	if($akses == 1)
	// 	{
	// 		$sql = "SELECT * FROM problems WHERE problem_status = 'Switch Over' AND open_by = '".$id."' ORDER BY reported_date ASC";
	// 	}
	// 	else if($akses == 2)
	// 	{
	// 		$sql = "SELECT * FROM problems WHERE problem_status = 'Switch Over' AND assign_to = '".$id."' ORDER BY reported_date ASC";
	// 	}
	// 	else
	// 	{
	// 		$sql = "SELECT * FROM problems WHERE problem_status = 'Switch Over' AND reported_by = '".$id."' ORDER BY reported_date ASC";
	// 	}
	// 	$query = $this->db->query($sql);
	// 	$hasil = $query->num_rows();
	// 	$row = $query->result();
	// 	return array('hasil'=>$hasil, 'data'=>$row);
	// }

	function openTicket($id, $akses)
	{
		$this->load->database();

		if($akses == 1)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Open' AND open_by = '".$id."' ORDER BY reported_date ASC";
		}
		else if($akses == 2)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Open' AND assign_to = '".$id."' ORDER BY reported_date ASC";
		}
		else
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Open' AND reported_by = '".$id."' ORDER BY reported_date ASC";
		}
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function solveTicket($id, $akses)
	{
		$this->load->database();

		if($akses == 1)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Solve' AND open_by = '".$id."' ORDER BY reported_date ASC";
		}
		else if($akses == 2)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Solve' AND assign_to = '".$id."' ORDER BY reported_date ASC";
		}
		else
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Solve' AND reported_by = '".$id."' ORDER BY reported_date ASC";
		}
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function closeTicket($id, $akses)
	{
		$this->load->database();

		if($akses == 1)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Close' AND open_by = '".$id."' ORDER BY reported_date ASC";
		}
		else if($akses == 2)
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Close' AND assign_to = '".$id."' ORDER BY reported_date ASC";
		}
		else
		{
			$sql = "SELECT * FROM problems WHERE problem_status = 'Close' AND reported_by = '".$id."' ORDER BY reported_date ASC";
		}
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function switchedoverTicket($assign, $id)
	{
		date_default_timezone_set('Asia/Jakarta');
		$this->load->database();
		$this->load->library('uuid');
		$datetime = date('Y-m-d H:i:s');
		$sql = "UPDATE problems SET assign_to='".$assign."', switch_date='".$datetime."', problem_status = 'Switch Over' WHERE problem_id = '".$id."'";
		$query = $this->db->query($sql);

		$sql = "INSERT INTO problem_history (problem_history_id, problem_id, keterangan, tanggal_kegiatan) 
            VALUES ('".$this->uuid->v4()."', '".$id."', 'Penyerahan Tiket Kepada Staf Ahli', '".$datetime."')";
		$query = $this->db->query($sql);
		return $query;
	}

	function openedTicket($id)
	{
		date_default_timezone_set('Asia/Jakarta');
		$this->load->database();
		$this->load->library('uuid');
		$datetime = date('Y-m-d H:i:s');
		
		$rowSetting = $this->setting();
		$xp = $rowSetting[0]->poin_xp;
		$rp = $rowSetting[0]->poin_rp;

		$getData = "SELECT reported_by, open_by, assign_to FROM problems WHERE problem_id = '".$id."'";
		$queryData = $this->db->query($getData);
		$rowData = $queryData->result();
		$a[0] = $rowData[0]->reported_by;
		$a[1] = $rowData[0]->open_by;
		$a[2] = $rowData[0]->assign_to;
		$arrlength = count($a);

		for($x=0; $x<$arrlength; $x++)
		{
			$sqlu = "SELECT poin_xp, poin_rp, levels FROM users WHERE user_id = '".$a[$x]."'";
			$querysqlu = $this->db->query($sqlu);
			$rowsqlu = $querysqlu->result();
			$xpnow = $rowsqlu[0]->poin_xp + $xp;
			$rpnow = $rowsqlu[0]->poin_rp + $rp;
			$levels = $rowsqlu[0]->levels + 1;

			$sqlup = "UPDATE users SET poin_xp='".$xpnow."', poin_rp='".$rpnow."' , levels='".$levels."' WHERE user_id = '".$a[$x]."'";
			$queryup = $this->db->query($sqlup);
		}

		$sql = "UPDATE problems SET open_date='".$datetime."', problem_status = 'Open' WHERE problem_id = '".$id."'";
		$query = $this->db->query($sql);

		$sql = "INSERT INTO problem_history (problem_history_id, problem_id, keterangan, tanggal_kegiatan) 
            VALUES ('".$this->uuid->v4()."', '".$id."', 'Pembukaan Tiket Oleh Staf Ahli', '".$datetime."')";
		$query = $this->db->query($sql);
		return $query;
	}

	function solvedTicket($id, $res)
	{
		date_default_timezone_set('Asia/Jakarta');
		$this->load->database();
		$this->load->library('uuid');
		$datetime = date('Y-m-d H:i:s');
		$sql = "UPDATE problems SET conclusion='".$res."', resolved_date='".$datetime."', problem_status = 'Solve' WHERE problem_id = '".$id."'";
		$query = $this->db->query($sql);
		
		$sql = "INSERT INTO problem_history (problem_history_id, problem_id, keterangan, tanggal_kegiatan) 
            VALUES ('".$this->uuid->v4()."', '".$id."', 'Penyelesaian Tiket oleh Staff Ahli', '".$datetime."')";
		$query = $this->db->query($sql);
		return $query;
	}

	function closedTicket($id, $res)
	{
		date_default_timezone_set('Asia/Jakarta');
		$this->load->database();
		$this->load->library('uuid');
		$datetime = date('Y-m-d H:i:s');

		$getData = "SELECT reported_by, open_by, assign_to FROM problems WHERE problem_id = '".$id."'";
		$queryData = $this->db->query($getData);
		$rowData = $queryData->result();
		$a[0] = $rowData[0]->reported_by;
		$a[1] = $rowData[0]->open_by;
		$a[2] = $rowData[0]->assign_to;
		$arrlength = count($a);

		for($x=0; $x<$arrlength; $x++)
		{
			$sqlu = "SELECT poin_xp, poin_rp, levels FROM users WHERE user_id = '".$a[$x]."'";
			$querysqlu = $this->db->query($sqlu);
			$rowsqlu = $querysqlu->result();
			$xpnow = $rowsqlu[0]->poin_xp + 1;

			$sqlup = "UPDATE users SET poin_xp='".$xpnow."' WHERE user_id = '".$a[$x]."'";
			$queryup = $this->db->query($sqlup);
		}

		$sql = "UPDATE problems SET conclusion='".$res."', closed_date='".$datetime."', problem_status = 'Close' WHERE problem_id = '".$id."'";
		$query = $this->db->query($sql);

		$sql = "INSERT INTO problem_history (problem_history_id, problem_id, keterangan, tanggal_kegiatan) 
            VALUES ('".$this->uuid->v4()."', '".$id."', 'Penolakan Pemberian Saran Tiket oleh Staff Ahli', '".$datetime."')";
		$query = $this->db->query($sql);
		return $query;
	}
}
?>