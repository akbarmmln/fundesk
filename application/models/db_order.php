<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Db_order extends CI_Model{
    
    function hasilapriori($nokal)
    {
        $data = array(
			'nokal' => $nokal,
		);
		
		$base = "https://fmks.000webhostapp.com/api/serverhost.php";
		$param = array(
			'opsi' => 'hasil',
			'nokal' => $data['nokal'],
		);

		$options = array(
		  'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($param),
		  ),
		);

		$context  = stream_context_create($options);
		$result = file_get_contents($base, false, $context);
		$result = json_decode($result);
		return $result;
    }

    function cekresend($email)
    {
        $this->load->database();
        $sql = "SELECT customer.nama, login.* FROM customer JOIN login ON customer.id_customer = login.id_customer WHERE login.email = '".$email."'";
        $sqlresult = $this->db->query($sql);
        $sqlrows = $sqlresult->num_rows();
        $sqldata = $sqlresult->result();
        return array('baris'=>$sqlrows, 'data'=>$sqldata);
    }

    function check_booking($idcus)
    {
        $this->load->database();
        $sql = "SELECT * FROM jadwal JOIN booking ON jadwal.id_jadwal = booking.id_jadwal WHERE booking.id_customer = '".$idcus."' AND (booking.status_pembayaran != 'Expired' AND booking.status_pembayaran != 'Valid') ORDER BY booking.no DESC";
        $sqlresult = $this->db->query($sql);
        $sqlrows = $sqlresult->num_rows();
        $sqldata = $sqlresult->result();
        return array('baris'=>$sqlrows, 'data'=>$sqldata);
    }
    
    function getMS()
    {
        $this->load->database();
        $sqlms = "SELECT minimum_support FROM setting_apriori";
        $resultms = $this->db->query($sqlms);
        $datams = $resultms->row();
        return $datams->minimum_support;
    }
    
    function getMC()
    {
        $this->load->database();
        $sqlmc = "SELECT minimum_confidence FROM setting_apriori";
        $resultmc = $this->db->query($sqlmc);
        $datams = $resultmc->row();
        return $datams->minimum_confidence;
    }

    function check_kursiavailable($idjadwal, $jumlahkursi)
    {
        $this->load->database();
		$sql_cekjumlahdipesan = "select sum(jumlahpenumpang) as jp FROM booking WHERE id_jadwal = '".$idjadwal."' AND status_pembayaran != 'Expired'";
		$query_cekjumlahdipesan = $this->db->query($sql_cekjumlahdipesan);
		$data_jumlahdipesan = $query_cekjumlahdipesan->row();
        if($data_jumlahdipesan->jp == NULL)
        {
            $kursibooking = 0;
        }
        else
        {
            $kursibooking = $data_jumlahdipesan->jp;
        }
        
		$sisa = $jumlahkursi - $kursibooking;
		return array('sisakursi'=>$sisa);
    }
    
	function check_kapalavailable($asal,$tujuan,$tglb)
	{
	    $this->load->database();
		$sql = "select kapal.id_kapal, kapal.nomor_kapal, kapal.nama_kapal, kapal.jumlah_kursi, kapal.harga, jadwal.id_jadwal, jadwal.waktu_berangkat, jadwal.waktu_tiba, jadwal.asal, 
				jadwal.tujuan, jadwal.tanggal from kapal join jadwal on kapal.id_kapal = jadwal.id_kapal 
				where jadwal.tanggal = '".$tglb."' and jadwal.asal = '".$asal."' and jadwal.tujuan = '".$tujuan."'";
		$query = $this->db->query($sql);		
		$ketersediaan = $query->num_rows();
		$data = $query->result();
		
		return array('hasil'=>$ketersediaan, 'data'=>$data);
	}
	
	function review_kapal($idjad)
	{
	    $this->load->database();
	    $sql = "SELECT kapal.nama_kapal, kapal.harga, jadwal.id_kapal, jadwal.tanggal, jadwal.asal, jadwal.tujuan, jadwal.waktu_berangkat, jadwal.waktu_tiba FROM kapal JOIN jadwal ON kapal.id_kapal = jadwal.id_kapal WHERE jadwal.id_jadwal = '".$idjad."'";
		$query = $this->db->query($sql);		
		$data = $query->result();
	    
	    return array('data'=>$data);
	}
	
	function review_kapal_booking($idjad, $idbook)
	{
	    $this->load->database();
	    $sql = "SELECT kapal.nama_kapal, kapal.harga, jadwal.id_kapal, jadwal.tanggal, jadwal.asal, jadwal.tujuan, jadwal.waktu_berangkat, jadwal.waktu_tiba, booking.tanggal_booking, booking.jumlahpenumpang, booking.totalbayar, booking.nama_pemesan, booking.email_ver, booking.status_pembayaran FROM kapal JOIN jadwal ON kapal.id_kapal = jadwal.id_kapal JOIN booking ON jadwal.id_jadwal = booking.id_jadwal WHERE jadwal.id_jadwal = '".$idjad."' AND booking.id_booking = '".$idbook."'";
		$query = $this->db->query($sql);		
		$data = $query->result();
	    $baris = $query->num_rows();
	    return array('baris'=>$baris, 'data'=>$data);
	}
	
	function lihatjadwal()
	{
		$this->load->database();
		$sql = "SELECT * FROM jadwal ORDER BY id_jadwal ASC";
		$sqlquery = $this->db->query($sql);
		$hasil = $sqlquery->num_rows();
		$row = $sqlquery->result();
		return array('hasil'=>$hasil, 'data'=>$row);
	}
}
?>