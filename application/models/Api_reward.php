<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_reward extends CI_Model{
	
	function prosestukar($idreward, $idusers, $np)
	{
		$this->load->database();
		$this->load->library('uuid');
		$uuid = $this->uuid->v4();

		$sqlcu = $this->db->query("SELECT * FROM users WHERE user_id = '".$idusers."'");
		$rowcu = $sqlcu->result();
		
		$poinuser = $rowcu[0]->poin_rp;
		if($poinuser == '' || $poinuser == null)
		{
			return false;
		}
		else
		{
			$sqlrw = $this->db->query("SELECT * FROM reward WHERE id_reward = '".$idreward."'");
			$hasilrw = $sqlrw->num_rows();
			$rowrw = $sqlrw->result();
			if($hasilrw > 0)
			{
				if($poinuser < $rowrw[0]->poin)
				{
					return "1100";
				}
				else
				{
					$pointnow = $poinuser - $rowrw[0]->poin;
					$sqlinpr = $this->db->query("INSERT INTO penukaran_reward (id, user_id, id_reward) VALUES ('".$uuid."', '".$idusers."', '".$idreward."')");
					$sqlupdpousr = $this->db->query("UPDATE users SET poin_rp = '".$pointnow."' WHERE user_id = '".$idusers."'");
					return sqlupdpousr;
				}
			}
			else
			{
				return false;
			}
		}
	}

	function history($userid)
	{
		$this->load->database();
		$sql = "SELECT * FROM penukaran_reward JOIN reward ON penukaran_reward.id_reward = reward.id_reward WHERE penukaran_reward.user_id = '".$userid."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$data = $query->result();
		return array('hasil'=>$hasil, 'data'=>$data);
	}

	function myreward($userid)
	{
		$this->load->database();
		$sqlPo = "SELECT poin_rp FROM users WHERE user_id = '".$userid."'";
		$queryPo = $this->db->query($sqlPo);
		$dataPo = $queryPo->result();
		$sqlRw = "SELECT * FROM reward WHERE poin <= '".$dataPo[0]->poin_rp."' ORDER BY poin ASC";
		$queryRw = $this->db->query($sqlRw);
		$hasilRw = $queryRw->num_rows();
		$rowRw = $queryRw->result();
		return array('hasil'=>$hasilRw, 'data'=>$rowRw);
	}

	function findReward($id)
	{
		$this->load->database();
		$sql = "SELECT * FROM reward WHERE id_reward = '".$id."'";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}

	function dataReward()
	{
		$this->load->database();
		$sql = "SELECT * FROM reward ORDER BY poin ASC";
		$query = $this->db->query($sql);
		$hasil = $query->num_rows();
		$row = $query->result();
		return array('hasil'=>$hasil, 'data'=>$row);
  }
    
  function createReward($reward, $poin, $img)
  {
		$this->load->database();
		$this->load->library('uuid');
		$sql = "INSERT INTO reward (id_reward, reward, poin, gambar) VALUES ('".$this->uuid->v4()."', '".$reward."', '".$poin."', '".$img."')";
		$query = $this->db->query($sql);
    return $query;
  }

  function updateReward($id, $reward, $poin)
  {
		$this->load->database();
		$sql = "UPDATE reward SET reward='".$reward."', poin='".$poin."' WHERE id_reward='".$id."'";
		$query = $this->db->query($sql);
    return $query;
  }

  function deleteReward($id)
  {
		$this->load->database();
		$sql = "DELETE FROM reward WHERE id_reward='".$id."'";
		$query = $this->db->query($sql);
		return $query;
  }
}
?>