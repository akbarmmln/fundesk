<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller{

	function __construct()
	{
		parent::__construct();
        $this->load->model('api_profil');
        $this->load->library('user_agent');
	}

	function index()
	{
        echo "<script>alert('Anda dalam keadaan login'); window.location.href='".base_url('app')."';</script>";
    }

    function renewprofile()
    {
        if($this->session->userdata('login') != "logged")
		{
			echo "<script>alert('Anda Harus Login Terlebih Dahulu'); window.location.href='".base_url('login')."';</script>";
		}
		else
		{
            $image1 = "";
            $image2 = "";
            $kesalahan = 0;
            
            $id = $this->input->post('id');
            $nd = $this->input->post('nd');
            $na = $this->input->post('na');
            $alt = $this->input->post('alt');
            $notelp = $this->input->post('notelp');
            $em = $this->input->post('em');
            
            if($_FILES['foto1']['tmp_name'])
            {
				$image1 = addslashes(file_get_contents($_FILES['foto1']['tmp_name']));
                $image_size1	= getimagesize($_FILES['foto1']['tmp_name']);
                if($image_size1 == false)
                {
                    $kesalahan = 1;
                    echo "<script>alert('File yang dipilih bukan gambar. Kesalahan saat upload gambar. Coba kembali');</script>";
                }
            }

            if($_FILES['foto2']['tmp_name'])
            {
				$image2 = addslashes(file_get_contents($_FILES['foto2']['tmp_name']));
                $image_size2	= getimagesize($_FILES['foto2']['tmp_name']);
                if($image_size2 == false)
                {
                    $kesalahan = 1;
                    echo "<script>alert('File yang dipilih bukan gambar. Kesalahan saat upload gambar. Coba kembali');</script>";
                }
            }

            if($kesalahan == 1)
            {
                echo "<script>window.location.href='".base_url('app')."';</script>";
            }
            else
            {
                $result = $this->api_profil->updateProfile($id, $nd, $na, $alt, $notelp, $em, $image1, $image2);
                if($result)
                {
                    echo "<script>alert('Data telah dirubah'); window.location.href='".base_url('app')."';</script>";
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