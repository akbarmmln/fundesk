<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Ticket extends CI_Controller{

	function __construct(){
		parent::__construct();
		$this->load->model('api_ticket');
	}

	function index()
	{
        echo "<script>alert('Anda dalam keadaan login'); window.location.href='".base_url('app')."';</script>";
    }
    
    function conclude()
    {
        if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
        else
        {
            $id = $this->input->post('id');
            $linkto = $this->input->post('linkto');
            $res = $this->input->post('res');
            $result = $this->api_ticket->solvedTicket($id, $res);
            if($result)
            {
                echo "<script>alert('Data telah disimpan'); window.location.href='".base_url('app/ticket/details/'.$linkto)."';</script>";
            }
            else
            {
                echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
            }
        }
    }

    function next()
    {
        if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
        else
        {
            $pil = $this->input->post('pil');
            $id = $this->input->post('id');
            $linkto = $this->input->post('linkto');
            if($pil == 'Open')
            {
                $result = $this->api_ticket->openedTicket($id);
            }
            else if($pil == 'Close')
            {
                $res = $this->input->post('res');
                if($res == '' || empty($res))
                {
                    echo "<script>alert('Alasan kosong atau tidak terisi'); window.location.href='javascript:history.back(-1)';</script>";
                }
                else
                {
                    $result = $this->api_ticket->closedTicket($id, $res);
                }
            }

            if($result)
            {
                echo "<script>alert('Data telah disimpan'); window.location.href='".base_url('app/ticket/details/'.$linkto)."';</script>";
            }
            else
            {
                echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
            }
        }
    }

    function task()
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
                $sel = $this->input->post('sel');
                $linkto = $this->input->post('linkto');
                $result = $this->api_ticket->switchedoverTicket($sel, $id);
				if($result)
				{
					echo "<script>alert('Data telah disimpan'); window.location.href='".base_url('app/ticket/details/'.$linkto)."';</script>";
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

    function new()
    {
        if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
            $image = "";
            $kesalahan = 0;
            $id_user = $this->input->post('id_user');
            $by = $this->input->post('by');
            $telp = $this->input->post('telp');
            $idcat = $this->input->post('idcat');
            $site = $this->input->post('site');
            $ps = $this->input->post('ps');
            $pd = $this->input->post('pd');
            
            if($_FILES['file']['tmp_name'])
            {
                $image = addslashes(file_get_contents($_FILES['file']['tmp_name']));
                $image_size	= getimagesize($_FILES['file']['tmp_name']);
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
				$result = $this->api_ticket->createTicket($id_user, $by, $telp, $idcat, $site, $ps, $pd, $image);
				if($result)
				{
					echo "<script>alert('Data telah ditambahkan'); window.location.href='".base_url('app')."';</script>";
				}
				else
				{
					echo "<script>alert('Server tidak menanggapi. Data gagal disimpan'); window.location.href='javascript:history.back(-1)';</script>";
				}
            }
		}
    }
}
?>