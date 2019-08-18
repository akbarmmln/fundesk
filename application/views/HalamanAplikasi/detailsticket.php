<?php
    // error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_ticket');
    $CI->load->model('api_category');
    $CI->load->model('api_priority');
    $CI->load->model('api_users');
    $ticketnum = $ticknum;
    $rticket = $this->api_ticket->searchTicket($ticketnum);
    if($rticket['hasil'] == 0)
    {
        echo "<script>alert('Data tiket tidak ditemukan'); window.location.href='javascript:history.back(-1)';</script>";
    }
    else
    {
        if($rticket['data'][0]->id_category != null || $rticket['data'][0]->id_category != "")
        {
            $rcategory = $this->api_category->findCategory($rticket['data'][0]->id_category);
            $rcategory = $rcategory['data'][0]->category;
        }
        else
        {
            $rcategory = "{Tidak Terdaftar}";
        }
        if($rticket['data'][0]->id_priority != null || $rticket['data'][0]->id_priority != "")
        {
            $rpriority = $this->api_priority->findPriority($rticket['data'][0]->id_priority);
            $rpriority = $rpriority['data'][0]->priority;
        }
        else
        {
            $rpriority = "{Tidak Terdaftar}";
        }
        $reported_by = $this->api_users->findUser($rticket['data'][0]->reported_by);
        if($rticket['data'][0]->assign_to != null || $rticket['data'][0]->assign_to != "")
        {
            $assign_to = $this->api_users->findUser($rticket['data'][0]->assign_to);
            $rassingto = $assign_to['data'][0]->user_first_name.' '.$assign_to['data'][0]->user_last_name;
        }
        else
        {
            $rassingto = "{Tidak Terdaftar}";
            if($this->session->userdata('user_akses') == 1)
            {
                $rassingto = "{Tidak Terdaftar} <a id='btntambahf' href='javascript:void(0);'><em class=material-icons>edit</em></a>";
            }
        }
        $rdok = $this->api_users->findUser($rticket['data'][0]->open_by);
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Rincian</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" type="image/x-icon">
    
    <!--REQUIRED PLUGIN CSS-->
    <link href="<?php echo base_url('assetss');?>/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="<?php echo base_url('assetss');?>/plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="<?php echo base_url('assetss');?>/plugins/spinkit/spinkit.css" rel="stylesheet">

    <!--REQUIRED THEME CSS -->
    <link href="<?php echo base_url('assetss');?>/assets/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/assets/css/layout.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/assets/css/themes/main_theme.css" rel="stylesheet" />

    <!--THIS PAGE LEVEL CSS-->
    <link href="<?php echo base_url('assetss');?>/plugins/morrisjs/morris.css" rel="stylesheet" />
    <!--Chat Css-->
    <link href="<?php echo base_url('assetss');?>/plugins/wchat/assets/css/style-light.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/wchat/assets/css/mobile.css" rel="stylesheet" id="style">

    <!-- EMOJI ONE JS -->
    <link rel="stylesheet" href="<?php echo base_url('assetss');?>/plugins/wchat/smiley/assets/sprites/emojione.sprites.css"/>
    <script src="<?php echo base_url('assetss');?>/plugins/wchat/smiley/js/emojione.min.js"></script>
    <link href="<?php echo base_url('assetss');?>/assets/w3css/w3.css" rel="stylesheet">
	<link href="<?php echo base_url('assetss');?>/assets/w3css/w3-theme-blue-grey.css" rel="stylesheet">

    <script type="text/javascript">
        // #################################################
        // # Optional

        // default is PNG but you may also use SVG
        emojione.imageType = 'png';
        emojione.sprites = false;

        // default is ignore ASCII smileys like :) but you can easily turn them on
        emojione.ascii = true;

        // if you want to host the images somewhere else
        // you can easily change the default paths
        emojione.imagePathPNG = '<?php echo base_url('assetss');?>/plugins/wchat/smiley/assets/png/';
        emojione.imagePathSVG = '<?php echo base_url('assetss');?>/plugins/wchat/smiley/assets/svg/';

        // #################################################
    </script>
                        <style>
							.modal {
								display: none; /* Hidden by default */
								position: fixed; /* Stay in place */
								z-index: 1; /* Sit on top */
								padding-top: 80px; /* Location of the box */
								left: 0;
								top: 0;
								width: 100%; /* Full width */
								height: 100%; /* Full height */
								overflow: auto; /* Enable scroll if needed */
								background-color: rgb(0,0,0); /* Fallback color */
								background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
							}

							/* Modal Content */
							.modal-content {
								position: relative;
								background-color: #fefefe;
								margin: auto;
								padding: 0;
								border: 1px solid #888;
								width: 50%;
								box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
								-webkit-animation-name: animatetop;
								-webkit-animation-duration: 0.4s;
								animation-name: animatetop;
								animation-duration: 0.4s
							}

							/* Add Animation */
							@-webkit-keyframes animatetop {
								from {top:-300px; opacity:0} 
								to {top:0; opacity:1}
							}

							@keyframes animatetop {
								from {top:-300px; opacity:0}
								to {top:0; opacity:1}
							}
                            
							/* The Close Button */
							.closef {
								color: white;
								float: right;
								font-size: 28px;
								font-weight: bold;
							}

							.closef:hover,
							.closef:focus {
								color: #000;
								text-decoration: none;
								cursor: pointer;
							}

							.closeR {
								color: white;
								float: right;
								font-size: 28px;
								font-weight: bold;
							}

							.closeR:hover,
							.closeR:focus {
								color: #000;
								text-decoration: none;
								cursor: pointer;
							}

							.modal-header {
								padding: 2px 16px;
								background-color: #5cb85c;
								color: white;
							}

							.modal-body {padding: 2px 16px;}

							.modal-footer {
								padding: 2px 16px;
								background-color: #5cb85c;
								color: white;
							}

							.footer {
							   position: fixed;
							   left: 0;
							   bottom: 0;
							   width: 100%;
							   background-color: #4af7dd;
							   color: #272d2d;
							   text-align: center;
							}
						  </style>
</head>

<body class="theme-indigo light layout-fixed">
<div class="wrapper">
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="sk-wave">
                <div class="sk-rect sk-rect1 bg-cyan"></div>
                <div class="sk-rect sk-rect2 bg-cyan"></div>
                <div class="sk-rect sk-rect3 bg-cyan"></div>
                <div class="sk-rect sk-rect4 bg-cyan"></div>
                <div class="sk-rect sk-rect5 bg-cyan"></div>
            </div>
            <p>Please wait...</p>
        </div>
    </div>
    <!-- top navbar-->
    <header class="topnavbar-wrapper">
        <nav role="navigation" class="navbar topnavbar">
            <!-- START navbar header-->
            <div class="navbar-header">
                <a href="javascript:void(0);" class="navbar-brand">
                    <div class="brand-logo">
                        <img src="<?php echo base_url('assetss');?>/assets/images/logohpdesk.png" alt="Admin Logo" class="img-responsive">
                    </div>
                    <div class="brand-logo-collapsed">
                        <img src="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" alt="Admin Logo" class="img-responsive">
                    </div>
                </a>
            </div>
            <!-- END navbar header-->
            <!-- START Nav wrapper-->
            <div class="nav-wrapper">
                <!-- START Left navbar-->
                <ul class="nav navbar-nav">
                    <li>
                        <a href="javascript:void(0);" data-trigger-resize="" data-toggle-state="aside-collapsed" class="hidden-xs">
                            <em class="material-icons">menu</em>
                        </a>
                        <a href="javascript:void(0);" data-toggle-state="aside-toggled" data-no-persist="true" class="visible-xs sidebar-toggle">
                            <em class="material-icons">menu</em>
                        </a>
                    </li>
                </ul>
                <!-- END Left navbar-->
                <!-- START Right Navbar-->
                <?php $this->view('aside/aside');?>
            </div>
            <!-- #END# Nav wrapper-->
            <!-- START Search form-->
            <form role="search" action="#" class="navbar-form">
                <div class="form-group has-feedback">
                    <input type="text" placeholder="Type and search ..." class="form-control">
                    <em data-search-dismiss="" class="form-control-feedback material-icons">close</em>
                </div>
                <button type="submit" class="hidden btn btn-info">Submit</button>
            </form>
            <!-- #END# Search form-->
        </nav>
        <!-- END Top Navbar-->
    </header>
    <!-- sidebar-->
    <?php
        if($this->session->userdata('user_akses') == 1)
        {
            $this->view('Dashboard/sideradmin');
        }
        else
        {
            $this->view('Dashboard/sidermahasiswa');
        }
    ?>
    
    <!-- Main section-->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <div class="container-fluid">
                <div class="page-header">
                    <h2>RINCIAN DATA</h2>
                </div>

                <!--row-->
                <div class="row" id="masonry">
                    <!-- Sparkline Chart Widget -->
                        <!--Horizontal Form Elements-->
                        <div class="col-md-4">
                            <div class="card">
                                <div class="body">
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Nomor Tiket</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rticket['data'][0]->tiket_number;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Kategori</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rcategory;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Jenis Prioritas</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rpriority;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Tanggal Pelaporan</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rticket['data'][0]->reported_date;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Dilaporkan Oleh</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $reported_by['data'][0]->user_first_name.' '.$reported_by['data'][0]->user_last_name;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Tanggal Penugasan</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>
                                                            <?php
                                                                if($rticket['data'][0]->switch_date == null)
                                                                {
                                                                    echo "{Tidak Terdaftar}";
                                                                }
                                                                else
                                                                {
                                                                    echo $rticket['data'][0]->switch_date;
                                                                }
                                                            ?>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Ditugaskan Kepada</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rassingto;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Pemegang Dokumen</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rdok['data'][0]->user_first_name.' '.$rdok['data'][0]->user_last_name;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card">
                                <div class="body">
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Subjek</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rticket['data'][0]->problem_summary;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Detail Permasalahan</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $rticket['data'][0]->problem_detail;?></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label>Lampiran File</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <?php
                                                        if(empty($rticket['data'][0]->problem_file))
                                                        {
                                                            ?>
                                                            {Tidak Terdaftar}
                                                            <?php
                                                        }
                                                        else
                                                        {
                                                            ?>
                                                            <a target="blank_page" href="<?php echo base_url('app/file/'.$rticket['data'][0]->problem_id);?>"><em class="material-icons">cloud_download</em></a>
                                                            <?php
                                                        }
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <button type="submit" class="btn btn-primary btn-rounded waves-effect">Simpan Perubahan</button>
                                            </div>
                                            <div class="col-sm-6">
                                                <button onclick="window.location.href='<?php echo base_url('app');?>'" type="button" class="btn btn-danger btn-rounded waves-effect">Simpan Perubahan</button>
                                            </div>
                                        </div> -->
                                </div>
                            </div>
                            <?php
                                if($rticket['data'][0]->problem_status == 'Open')
                                {
                                    ?>
                                    <div class="card">
                                        <div class="body">
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label>Belum ada penyelesaian masalah</label>
                                                            <?php
                                                                if($this->session->userdata('user_akses') == 2)
                                                                {
                                                                    ?>
                                                                    <a id='btntambahR' href='javascript:void(0);'><em class=material-icons>edit</em></a>
                                                                    <?php
                                                                }
                                                            ?>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                else if($rticket['data'][0]->problem_status == 'Switch Over')
                                {
                                    if($this->session->userdata('user_akses') == 1 || $this->session->userdata('user_akses') == 3)
                                    {
                                        ?>
                                        <div class="card">
                                            <div class="body">
                                                    <div class="row clearfix">
                                                        <div class="col-sm-12">
                                                                <div class="form-group">
                                                                    <label>Menunggu keterangan dari Staff Ahli</label>
                                                                </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <div class="card">
                                            <div class="body">
                                                    <div class="row clearfix">
                                                        <div class="col-sm-12">
                                                            <form method="POST" action="<?php echo base_url('ticket/next');?>">
                                                                <div class="form-line">
                                                                    <input type="hidden" readonly class="form-control" name="id" id="id" value="<?php echo $rticket['data'][0]->problem_id;?>" required/>
                                                                    <input type="hidden" readonly class="form-control" name="linkto" id="linkto" value="<?php echo $ticketnum;?>" required/>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>Apakah Anda menerima tiket ini ?</label>
                                                                    <select name="pil" id="pil" required class="form-control" require>
                                                                        <option value="">Pilih</option>
                                                                        <option value="Open">Open</option>
                                                                        <option value="Close">Reject</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>Isikan penjelasan Anda tidak melanjutkan penyelesaian tiket ini</label>
                                                                    <textarea class="form-control" name="res" id="res" rows="7" placeholder="Keterangan : Jika memilih opsi Open, abaikan isian ini"></textarea>
                                                                </div>
                                                                <button type="submit" class="btn btn-primary btn-rounded waves-effect">Simpan</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <?php
                                    }
                                }
                                else if($rticket['data'][0]->problem_status == 'Solve')
                                {
                                    ?>
                                    <div class="card">
                                        <div class="body">
                                                <div class="row clearfix">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Tanggal Penyelesaian</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="form-group">
                                                            <div class="form-line">
                                                                <label><?php echo $rticket['data'][0]->resolved_date;?></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Kesimpulan Penyelesaian</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="form-group">
                                                            <div class="form-line">
                                                                <label><?php echo $rticket['data'][0]->conclusion;?></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                else if($rticket['data'][0]->problem_status == 'Close')
                                {
                                    ?>
                                    <div class="card">
                                        <div class="body">
                                                <div class="row clearfix">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Tanggal Penolakan</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="form-group">
                                                            <div class="form-line">
                                                                <label><?php echo $rticket['data'][0]->closed_date;?></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label>Alasan Penolakan</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="form-group">
                                                            <div class="form-line">
                                                                <label><?php echo $rticket['data'][0]->conclusion;?></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                            ?>
                        </div>
                </div>
                <!--row-->

                                            <div id="myModalUp" class="modal">
												<div class="modal-content">
													<div class="modal-header">
                                                        <span class="closef">&times;</span>
														<center><h3>Form Penugasan Lanjutan</h3></center>
													</div>
													<div class="modal-body">
														<form action="<?php echo base_url('ticket/task');?>" method="POST">
															<div class="form-group">
                                                                <div class="col-sm-12">
                                                                    <div class="form-line">
                                                                        <input type="hidden" readonly class="form-control" name="id" id="id" value="<?php echo $rticket['data'][0]->problem_id;?>" required/>
                                                                        <input type="hidden" readonly class="form-control" name="linkto" id="linkto" value="<?php echo $ticketnum;?>" required/>
                                                                    </div>
                                                                    <div class="form-line">
                                                                        <label>Penugasan Kepada</label>
                                                                        <select class="form-control" id="sel" name="sel">
                                                                            <?php
                                                                                $datatask = $this->api_users->getUserTask();
                                                                                if($datatask['hasil'] > 0)
                                                                                {
                                                                                    foreach($datatask['data'] as $isidata)
                                                                                    {
                                                                                        ?>
                                                                                        <option value="<?php echo $isidata->user_id;?>"><?php echo $isidata->user_first_name.' '.$isidata->user_last_name;?></option>
                                                                                        <?php
                                                                                    }
                                                                                }
                                                                            ?>
                                                                        </select>
                                                                    </div>
                                                                    <br>
                                                                </div>
															</div>
                                                            
															<button type="submit" class="w3-button w3-block w3-theme-l1">Simpan Perubahan</button>
															<br/>
														</form>
													</div>
												</div>
											</div>

                                            <div id="myModalR" class="modal">
												<div class="modal-content">
													<div class="modal-header">
                                                        <span class="closeR">&times;</span>
														<center><h3>Form Pengisian Hasil</h3></center>
													</div>
													<div class="modal-body">
														<form action="<?php echo base_url('ticket/conclude');?>" method="POST">
															<div class="form-group">
                                                                <div class="col-sm-12">
                                                                    <div class="form-line">
                                                                        <input type="hidden" readonly class="form-control" name="id" id="id" value="<?php echo $rticket['data'][0]->problem_id;?>" required/>
                                                                        <input type="hidden" readonly class="form-control" name="linkto" id="linkto" value="<?php echo $ticketnum;?>" required/>
                                                                    </div>
                                                                    <div class="form-line">
                                                                        <label>Hasil</label>
                                                                        <textarea class="form-control" name="res" id="res" required rows="7"></textarea>
                                                                    </div>
                                                                    <br>
                                                                </div>
															</div>
                                                            
															<button type="submit" class="w3-button w3-block w3-theme-l1">Simpan Perubahan</button>
															<br/>
														</form>
													</div>
												</div>
											</div>
            </div>
        </div>
    </section>
    <!-- FOOTER-->
    <footer>
        <span>&copy; 2019 - Helpdesk By <b class="col-blue">Adi Muhtadi</b></span>
    </footer>
</div>
    <!-- CORE PLUGIN JS -->
    <script src="<?php echo base_url('assetss');?>/plugins/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/bootstrap/js/bootstrap.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/modernizr/modernizr.custom.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/screenfull/dist/screenfull.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/jQuery-Storage-API/jquery.storageapi.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/node-waves/waves.js"></script>

    <!-- LAYOUT JS -->
    <script src="<?php echo base_url('assetss');?>/assets/js/demo.js"></script>
    <script src="<?php echo base_url('assetss');?>/assets/js/layout.js"></script>
                            <script>
								var modalf = document.getElementById('myModalUp');
								var btntambahf = document.getElementById("btntambahf");
								var spanf = document.getElementsByClassName("closef")[0];

								btntambahf.onclick = function()
								{
									modalf.style.display = "block";
								}
								
								spanf.onclick = function()
								{
									modalf.style.display = "none";
								}

								/*
								window.onclick = function(event)
								{
									if (event.target == modalf)
									{
										modalf.style.display = "none";
									}
								}
								*/
							</script>

                            <script>
								var modalR = document.getElementById('myModalR');
								var btntambahR = document.getElementById("btntambahR");
								var spanR = document.getElementsByClassName("closeR")[0];

								btntambahR.onclick = function()
								{
									modalR.style.display = "block";
								}
								
								spanR.onclick = function()
								{
									modalR.style.display = "none";
								}

								/*
								window.onclick = function(event)
								{
									if (event.target == modalR)
									{
										modalR.style.display = "none";
									}
								}
								*/
							</script>

</body>

</html>