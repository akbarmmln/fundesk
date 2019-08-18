<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Crud extends CI_Model{

    function cancelbooking($idbooking)
    {
        $this->load->database();
        $sqlcek = "SELECT status_pembayaran FROM booking WHERE id_booking = '".$idbooking."'";
        $resultcek = $this->db->query($sqlcek);
        $resultbaris = $resultcek->num_rows();
	    if($resultbaris > 0)
	    {
    	    $datastatus = $resultcek->row();
    	    $status = $datastatus->status_pembayaran;
            if($status == "Pending" || $status == "ON")
            {
                $sqlcancel = "CALL cancelBooking('".$idbooking."')";
                $resultcancel = $this->db->query($sqlcancel);
                if($resultcancel)
                {
                    return "true";
                }
                else
                {
                    return "false";
                }
            }
            else if($status == "Expired")
            {
                return "expired";
            }
            else
            {
                return "valid";
            }
	    }
	    else
	    {
	        return "notmatch";
	    }
    }

	function create_random($length)
	{
		$data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		$string = '';
		for($i = 0; $i < $length; $i++)
		{
			$pos = rand(0, strlen($data)-1);
			$string .= $data{$pos};
		}
		return $string;
	}

    function create_radom_number()
    {
        $length = 6;
		$data = '0123456789';
		$string = '';
		for($i = 0; $i < $length; $i++)
		{
			$pos = rand(0, strlen($data)-1);
			$string .= $data{$pos};
		}
		return $string;
    }
    
	function addBooking($idjad, $idcus, $np, $alamat, $notelp, $pax, $tb, $em, $noiden, $nama, $tglotw)
	{
        date_default_timezone_set('Asia/Jakarta');
        $datetime = new DateTime();
        $tglnow = $datetime->format('Y-m-d H:i');
        $tglnext = date('Y-m-d H:i', strtotime('+1 hours', strtotime($tglnow)));
        $tglbooking = $datetime->format('Y-m-d');

	    $numrand = $this->create_radom_number();
	    $this->load->database();
	    //memeriksa ketersediaan tiket sebelum booking - jumlah tiket disediakan
	    $sqltiketdisediakan = "SELECT jadwal.id_kapal, kapal.jumlah_kursi FROM jadwal JOIN kapal ON jadwal.id_kapal = kapal.id_kapal  WHERE jadwal.id_jadwal = '".$idjad."'";
	    $querytiketdisediakan = $this->db->query($sqltiketdisediakan);
	    $datatiketdisediakan = $querytiketdisediakan->row();
	    $tikettersedia = $datatiketdisediakan->jumlah_kursi;
	    
	    //memeriksa ketersediaan tiket sebelum booking - jumlah tiket telah dibooking
	    $sqltiketdibooking = "SELECT SUM(jumlahpenumpang) as tbooked FROM booking WHERE id_jadwal = '".$idjad."'";
	    $querytiketdibooking = $this->db->query($sqltiketdibooking);
	    $datatiketdibooking = $querytiketdibooking->row();
	    $tiketdibooking = $datatiketdibooking->tbooked;
	    
	    if($tiketdibooking == "" || $tiketdibooking == null)
	    {
	        $tiketdibooking = 0;
	    }
	    
	    //memeriksa ketersediaan tiket sebelum booking - jumlah tiket memenuhi pesanan booking
	    $sisatiket = $tikettersedia - $tiketdibooking;
	    
	    if($sisatiket >= $pax)
	    {
    	    $sql = "CALL addBooking('".$idjad."', '".$idcus."', '".$np."', '".$alamat."', '".$notelp."', '".$pax."','".$tb."', '".$em."', @out, '".$numrand."', '".$tglotw."', '".$tglnow."', '".$tglnext."', '".$tglbooking."')";
    		$query = $this->db->query($sql);
    		if($query)
    		{
    		    $sqldataid = "SELECT @out as rid";
    		    $querydataid = $this->db->query($sqldataid);
    		    $dataid = $querydataid->row();
    
    		    for($k=1; $k<=$pax; $k++)
    		    {
    		        $sqlinserboket = "INSERT INTO rincian_booking(id_booking, noidentitas, nama) 
    		                            VALUES ('".$dataid->rid."', '".$noiden[$k]."', '".$nama[$k]."')";
                    $queryinserboket = $this->db->query($sqlinserboket);
    		    }
                
                return array("hasil"=>"sukses", "data"=>$dataid->rid);
    		}
    		else
    		{
    			return array("hasil"=>"gagal");
    		}
	    }
	    else
	    {
	        return array("hasil"=>"reject");
	    }
	}
	
	function simpanImport($ip, $k)
	{
		$this->load->database();
        $sql = "INSERT INTO apriori (id_penilai, kategori) VALUES('".$ip."', '".$k."')";
        $query = $this->db->query($sql);
	}
	
	function simpanMS($data)
	{
		$this->load->database();
        $sql = "UPDATE setting_apriori SET minimum_support = '".$data."'";
        $query = $this->db->query($sql);
        if($query)
        {
            return "sukses";
        }
		else
		{
			return "gagal";
		}
	}
	
	function simpanMC($data)
	{
		$this->load->database();
        $sql = "UPDATE setting_apriori SET minimum_confidence = '".$data."'";
        $query = $this->db->query($sql);
        if($query)
        {
            return "sukses";
        }
		else
		{
			return "gagal";
		}
	}

    function resend($data)
    {
        date_default_timezone_set('Asia/Jakarta');
        $now = new DateTime();
        $tglnow = $now->format('Y-m-d H:i');
        $tglnext = date('Y-m-d H:i', strtotime('+24 hours', strtotime($tglnow)));

        $this->load->database();
        $sql = "UPDATE login SET kode_verifikasi = '".$data['kv']."', link_verifikasi = '".$data['lv']."', batas_waktu = '".$tglnext."' WHERE email = '".$data['email']."'";
        $query = $this->db->query($sql);
        if($query)
		{
			return "sukses";
		}
		else
		{
			return "gagal";
		}
    }

	function saveDataCustomer($data)
	{
        date_default_timezone_set('Asia/Jakarta');
        $now = new DateTime();
        $tglnow = $now->format('Y-m-d H:i');
        $tglnext = date('Y-m-d H:i', strtotime('+24 hours', strtotime($tglnow)));
        
        $this->load->database();
		$sql = "CALL addCustomer('".$data['nama']."', '".$data['email']."', '".$data['password']."', '".$data['kv']."', '".$data['lv']."', '".$tglnext."')";
		$query = $this->db->query($sql);
		if($query)
		{
			return "sukses";
		}
		else
		{
			return "gagal";
		}
	}
}
?>