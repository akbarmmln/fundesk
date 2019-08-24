<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class App extends CI_Controller{

	function __construct(){
		parent::__construct();
		$this->load->model('api_users');
		$this->load->model('api_category');
		$this->load->model('api_reward');
		$this->load->model('api_priority');
		$this->load->model('api_setting');
		$this->load->model('api_ticket');
		$this->load->model('api_survey');
		$this->load->library('user_agent');
	}

	function fundesksurvey()
	{
        $this->load->view('Survey/hasilsurvey');
	}

	function datasurvey()
	{
		$result = $this->api_survey->all();
		$dataur = $this->api_survey->getUraian();
		$bobotratatertimbang = 1/$dataur['hasil'];

		echo "<thead>
		<tr>
			<th rowspan='2' style='vertical-align : middle;text-align:center;'>No</th>
			<th class='text-center' width='40%' rowspan='2' style='vertical-align : middle;text-align:center;'>Indikator</th>
			<th colspan='4' class='text-center' style='vertical-align : middle;text-align:center;'>Frekuensi Kepuasan</th>
			<th rowspan='2' class='text-center' style='vertical-align : middle;text-align:center;'>Nilai IKM</th>
			<th rowspan='2' class='text-center' style='vertical-align : middle;text-align:center;'>Konversi IKM</th>
		</tr>
		<tr>
			<th width='5%' class='text-center' style='vertical-align : middle;text-align:center;'>STP</th>
			<th width='5%' class='text-center' style='vertical-align : middle;text-align:center;'>TP</th>
			<th width='5%' class='text-center' style='vertical-align : middle;text-align:center;'>P</th>
			<th width='5%' class='text-center' style='vertical-align : middle;text-align:center;'>SP</th>
		</tr>
		</thead>";

		echo "<tbody>";
		$i = 1;
		$jumlahpertanyaan = 0;
		$footerikm = 0;
		$footerstp = 0;
		$footertp = 0;
		$footerp = 0;
		$footersp = 0;
		$resultresponden = $this->api_survey->dataresponden();
		$datajumlahresponden = $resultresponden['hasil'];

		foreach($result['data'] as $isidata)
		{
			$jumlahpertanyaan++;
			$stp = 0;
			$tp = 0;
			$p = 0;
			$sp = 0;

			$resultisi = $this->api_survey->isique($isidata->uraian);
			foreach($resultisi['data'] as $isidataisi)
			{
				if($isidataisi->kepuasaan == 1)
				{
					$stp++;
				}
				else if($isidataisi->kepuasaan == 2)
				{
					$tp++;
				}
				else if($isidataisi->kepuasaan == 3)
				{
					$p++;
				}
				else if($isidataisi->kepuasaan == 4)
				{
					$sp++;
				}
			}
			$skorstp = $stp * 1;
			$skortp = $tp * 2;
			$skorp = $p * 3;
			$skorsp = $sp * 4;
			$totalskor = $skorstp + $skortp + $skorp + $skorsp;
			$nrrperunsur = $totalskor / $datajumlahresponden;
			$nilaiikm = $nrrperunsur * $bobotratatertimbang;
			$roundikm = round($nilaiikm,3);
			$roundnrrperunsur = round($nrrperunsur, 3);

			$totalnrrperunsur += $nrrperunsur;
			$roundnpu = round($totalnrrperunsur, 3);
			$totalnilaiikm += $nilaiikm;
			$roundnkm = round($totalnilaiikm, 3);

			$footerikm += $nilaiikm;
			$footerstp += $stp;
			$footertp += $tp;
			$footerp += $p;
			$footersp += $sp;

			echo "<tr>
				<td>$i</td>
				<td>$isidata->uraian</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$stp</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$tp</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$p</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$sp</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$roundnrrperunsur</td>
				<td class='text-center' style='vertical-align : middle;text-align:center;'>$roundikm</td>
			</tr>";
			$i++;
		}
		$footerkonversiikm = $footerikm * 25;
		$footernilai = $this->api_survey->konversi($footerkonversiikm);
		$roundfootikm = round($footerikm,3);
		$roundfootkonvikm = round($footerkonversiikm,3);

		echo "<tr class='success'>
			<th class='text-center' colspan='2' style='vertical-align : middle;text-align:center;'>Jumlah (Frekuensi Kepuasan)</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footerstp</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footertp</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footerp</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footersp</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$roundnpu</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$roundnkm</th>
		</tr>
			<tr class='success'>
			<th class='text-center' colspan='7' style='vertical-align : middle;text-align:center;'>Konversi IKM</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$roundfootkonvikm</th>
		</tr>
		</tr>
			<tr class='success'>
			<th class='text-center' colspan='7' style='vertical-align : middle;text-align:center;'>Mutu Layanan</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footernilai[mutu]</th>
		</tr>
		</tr>
			<tr class='success'>
			<th class='text-center' colspan='7' style='vertical-align : middle;text-align:center;'>Kinerja Layanan</th>
			<th class='text-center' style='vertical-align : middle;text-align:center;'>$footernilai[kinerja]</th>
		</tr>
		";
		echo "</tbody>";
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------------------------------------
	function insurvey()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$isidk = $this->input->post('idk');
			$isk = $this->input->post('kepuasan');
			if(empty($isk))
			{
				echo "<script>alert('Data tidak dapat dikirimkan'); window.location.href='".base_url('app')."';</script>";
			}
			else
			{
				$result = $this->api_survey->insurvey($isidk, $isk, $this->session->userdata('user_id'));
				echo "<script>alert('Survey selesai. Terimakasih telah menjadi bagian'); window.location.href='".base_url('app')."';</script>";
			}
		}
	}

	function survey()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$this->load->view('HalamanAplikasi/survey');
		}
	}

	function valreward()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$idreward = $this->input->post('idreward');
			$idusers = $this->input->post('idusers');
			$np = $this->input->post('np');
			$result = $this->api_reward->prosestukar($idreward, $idusers, $np);
			if($result == '1100')
			{
				echo "<script>alert('Poin Anda tidak menucukupi untuk melakukan penukaran reward'); window.location.href='javascript:history.back(-1)';</script>";
			}
			else if($result == false)
			{
				echo "<script>alert('Terjadi Kesalahan ID Point'); window.location.href='javascript:history.back(-1)';</script>";
			}
			else
			{
				echo "<script>alert('Reward berhasil ditukarkan'); window.location.href='".base_url('app')."';</script>";
			}
		}
	}

	function tukarpoint()
	{
		$idPoint = $this->uri->segment(3);
		if($idPoint == '' || empty($idPoint))
		{
			echo "<script>alert('Terjadi Kesalahan ID Point'); window.location.href='javascript:history.back(-1)';</script>";
		}
		else
		{
			$cekUser = $this->api_users->findUser($this->session->userdata('user_id'));
			$poinuser = $cekUser['data'][0]->poin_rp;
			if($poinuser == '' || $poinuser == null)
			{
				echo "<script>alert('Terjadi Kesalahan ID Point'); window.location.href='javascript:history.back(-1)';</script>";
			}
			else
			{
				$hasilcek = $this->api_reward->findReward($idPoint);
				if($hasilcek['hasil'] > 0)
				{
					if($poinuser < $hasilcek['data'][0]->poin)
					{
						echo "<script>alert('Poin Anda tidak menucukupi untuk melakukan penukaran reward'); window.location.href='javascript:history.back(-1)';</script>";
					}
					else
					{
						$data = array(
							'idpoint' => $idPoint,
							'iduser' => $cekUser['data'][0]->user_id,
						);
						$this->load->view('HalamanAplikasi/tukarpoint', $data);
					}
				}
				else
				{
					echo "<script>alert('Terjadi Kesalahan ID Point'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
		}
	}

	function leaderboards()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$this->load->view('HalamanAplikasi/leaderboards');
		}
	}

	function datatarget()
	{
		$idticket = $this->input->post('target');
		$result = $this->api_ticket->detaillastest($idticket);
		$decode = json_decode($result);
		$this->load->view('HalamanAplikasi/insidedata', $decode);
	}

	function data()
	{
		$result = $this->api_ticket->lastest($this->input->post('ref'));
		if($result['hasil'] > 0)
		{
			foreach($result['data'] as $isidata)
			{
				echo "<tr>
				<td><a href='javascript:void(0);' class='hallo' data-toggle='modal' data-target='#defaultmodal' data-whatever='$isidata->tiket_number'>Nomor Tiket ($isidata->tiket_number)</a></td>
				<td>Subjek Tiket ($isidata->problem_summary)</td>
				<td>Status Tiket ($isidata->problem_status)</td>
				</tr>";
			}
		}
		else
		{
			echo "<tr><td><center>Tidak ada data terbaru</center></td></tr>";
		}
	}

	function newBrif()
	{
		$id = $this->session->userdata('user_id');
		$result = $this->api_ticket->getNewNumber($id);
		echo $result['hasil'];
	}

	function file()
	{
		$id = $this->uri->segment(3);
		$find = $this->api_ticket->searchTicket($id);
		if($find['hasil'] > 0)
		{
			?>
			<center>
			<img style="width: 850px; height: 850px;" src="<?php echo 'data:jpeg; base64,' . base64_encode($find['data'][0]->problem_file);?>">;
			</center>
			<?php
		}
		else
		{
			echo "File tidak ditemukan";
		}
	}

	function ticket()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->uri->segment(3) == 'new-ticket')
			{
				$this->load->view('HalamanAplikasi/datanewticket');
			}
			else if($this->uri->segment(3) == 'opened-ticket')
			{
				$this->load->view('HalamanAplikasi/dataopenticket');
			}
			else if($this->uri->segment(3) == 'solved-ticket')
			{
				$this->load->view('HalamanAplikasi/datasolveticket');
			}
			else if($this->uri->segment(3) == 'closed-ticket')
			{
				$this->load->view('HalamanAplikasi/datacloseticket');
			}
			else if($this->uri->segment(3) == 'details')
			{
				$data = array(
					'ticknum' => $this->uri->segment(4)
				);
				
				$this->load->view('HalamanAplikasi/detailsticket', $data);
			}
			else
			{
				echo "<script>window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function index()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			echo "<script>window.location.href='".base_url('app/dashboard')."';</script>";
		}
	}

	function getUser()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('HalamanAplikasi/datauser');
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function deleteUser()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('user_id');
	
				$result = $this->api_users->deleteUser($id);
				if($result)
				{
					echo "<script>alert('Data telah dihapus'); window.location.href='".base_url('app/getUser')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function updateUser()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$id = $this->input->post('id');
			$nmf = $this->input->post('nmf');
			$nml = $this->input->post('nml');
			$no = $this->input->post('no');
			$em = $this->input->post('em');
			$alt = $this->input->post('alt');

			$result = $this->api_users->updateUser($id, $nmf, $nml, $no, $em, $alt);
			if($result)
			{
				echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app/getUser')."';</script>";
			}
			else
			{
				echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function createUser()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$username = $this->input->post('username');
				$password = $this->input->post('password');
				$firstname = $this->input->post('firstname');
				$lastname = $this->input->post('lastname');
				$notelp = $this->input->post('notelp');
				$em = $this->input->post('em');
				$alt = $this->input->post('alt');
				$statuser = $this->input->post('statuser');
				
				$cekUsername = $this->api_users->cekUsername($username);
				if($cekUsername >= 1)
				{
					echo "<script>alert('Username sudah terdaftar'); window.location.href='javascript:history.back(-1)';</script>";
				}
				else
				{
					$result = $this->api_users->createUser($username, $password, $firstname, $lastname, $notelp, $em, $alt, $statuser);
					if($result)
					{
						echo "<script>alert('Data telah ditambahkan'); window.location.href='".base_url('app/getUser')."';</script>";
					}
					else
					{
						echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
					}
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function dashboard()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('Dashboard/dsadmin');
			}
			else if($this->session->userdata('user_akses') == 2)
			{
				$this->load->view('Dashboard/dsstaff');
			}
			else if($this->session->userdata('user_akses') == 3)
			{
				$this->load->view('Dashboard/dsmahasiswa');
			}
		}
	}

	function getCategory()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('HalamanAplikasi/datacategory');
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function updateKat()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id');
				$kat = $this->input->post('kat');
	
				$result = $this->api_category->updateKat($id, $kat);
				if($result)
				{
					echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app/getCategory')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function createKat()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$kategori = $this->input->post('kategori');
	
				$result = $this->api_category->createKat($kategori);
				if($result)
				{
					echo "<script>alert('Data telah ditambahkan'); window.location.href='".base_url('app/getCategory')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function deleteKat()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id_category');
	
				$result = $this->api_category->deleteKat($id);
				if($result)
				{
					echo "<script>alert('Data telah dihapus'); window.location.href='".base_url('app/getCategory')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function getReward()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('HalamanAplikasi/datareward');
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function createRaw()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$kesalahan = 0;
				$rw = $this->input->post('rw');
				$po = $this->input->post('po');

				if($_FILES['img']['tmp_name'])
				{
					$image = addslashes(file_get_contents($_FILES['img']['tmp_name']));
					$image_size	= getimagesize($_FILES['img']['tmp_name']);
					if($image_size == false)
					{
						$kesalahan = 1;
						echo "<script>alert('File yang dipilih bukan gambar. Kesalahan saat upload gambar. Coba kembali');</script>";
					}
				}
				if($kesalahan == 1)
				{
					echo "<script>window.location.href='javascript:history.back(-1)';</script>";
				}
				else
				{
					$result = $this->api_reward->createReward($rw, $po, $image);
					if($result)
					{
						echo "<script>alert('Data telah ditambahkan'); window.location.href='".base_url('app/getReward')."';</script>";
					}
					else
					{
						echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
					}	
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function updateRaw()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id');
				$rw = $this->input->post('rw');
				$po = $this->input->post('po');
	
				$result = $this->api_reward->updateReward($id, $rw, $po);
				if($result)
				{
					echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app/getReward')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function deleteRaw()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id_reward');
	
				$result = $this->api_reward->deleteReward($id);
				if($result)
				{
					echo "<script>alert('Data telah dihapus'); window.location.href='".base_url('app/getReward')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function getPrio()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('HalamanAplikasi/datapriority');
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function createPrio()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$prio = $this->input->post('prio');
	
				$result = $this->api_priority->createPriority($prio);
				if($result)
				{
					echo "<script>alert('Data telah ditambahkan'); window.location.href='".base_url('app/getPrio')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function updatePrio()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id');
				$prio = $this->input->post('prio');
	
				$result = $this->api_priority->updatePriority($id, $prio);
				if($result)
				{
					echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app/getPrio')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function deletePrio()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id_priority');
	
				$result = $this->api_priority->deletePriority($id);
				if($result)
				{
					echo "<script>alert('Data telah dihapus'); window.location.href='".base_url('app/getPrio')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function setting()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$this->load->view('HalamanAplikasi/setting');
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function updateSetting()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			if($this->session->userdata('user_akses') == 1)
			{
				$id = $this->input->post('id');
				$nl = $this->input->post('nl');
				$alt = $this->input->post('alt');
				$notelp = $this->input->post('notelp');
				$email = $this->input->post('email');
				$xp = $this->input->post('xp');
				$rp = $this->input->post('rp');
	
				$result = $this->api_setting->update($nl, $alt, $notelp, $email, $xp, $rp, $id);
				if($result)
				{
					echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app/setting')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
			}
			else
			{
				echo "<script>alert('User akses tidak diizinkan'); window.location.href='javascript:history.back(-1)';</script>";
			}
		}
	}

	function profsetting()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$this->load->view('HalamanAplikasi/profil');			
		}
	}

	function newtickets()
	{
		if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
			$this->load->view('HalamanAplikasi/newticket');			
		}
	}
}
?>