<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pdfreport extends CI_Controller {
 
    function __construct() {
        parent::__construct();
		// Load library
		$this->load->library('dompdf_gen');
    }
 
    function cetakpdf() {
		$this->load->view('cetak');
 
        $paper_size  = 'A4'; //paper size
        $orientation = 'potrait'; //tipe format kertas
        $html = $this->output->get_output();		
        
		//Convert to PDF
		$this->dompdf->set_paper($paper_size, $orientation);
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("laporan.pdf", array('Attachment'=>0));
	}
}
?>