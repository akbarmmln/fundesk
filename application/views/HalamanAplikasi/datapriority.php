<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_priority');
	$result = $CI->api_priority->dataPriority();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Data Priority</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" type="image/x-icon">

    <!--REQUIRED PLUGIN CSS-->
    <link href="<?php echo base_url('assetss');?>/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="<?php echo base_url('assetss');?>/plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="<?php echo base_url('assetss');?>/plugins/spinkit/spinkit.css" rel="stylesheet">

    <!--THIS PAGE LEVEL CSS-->
    <link href="<?php echo base_url('assetss');?>/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/jquery-datatable/skin/bootstrap/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/jquery-datatable/skin/bootstrap/css/scroller.bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/plugins/jquery-datatable/skin/bootstrap/css/fixedHeader.bootstrap.min.css" rel="stylesheet">

    <!--REQUIRED THEME CSS -->
    <link href="<?php echo base_url('assetss');?>/assets/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/assets/css/layout.css" rel="stylesheet">
    <link href="<?php echo base_url('assetss');?>/assets/css/themes/main_theme.css" rel="stylesheet" />

    <link href="<?php echo base_url('assetss');?>/assets/w3css/w3.css" rel="stylesheet">
	<link href="<?php echo base_url('assetss');?>/assets/w3css/w3-theme-blue-grey.css" rel="stylesheet">
	
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style>
        table.dataTable th.focus, table.dataTable td.focus {
            outline: 2px solid #ee8d8d !important;
            outline-offset: -1px;
        }
    </style>

    <style>
        *{padding:0;margin:0;}

        .float{
            position:fixed;
            width:50px;
            height:50px;
            bottom:70px;
            right:40px;
            background-color:#edf2f2;
            color:#053d3a;
            border-radius:50px;
            text-align:center;
            box-shadow: 2px 2px 3px #053d3a;
        }

        .my-float{
            margin-top:5px;
        }
    </style>

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
    <?php $this->view('Dashboard/sideradmin');?>

    <!-- Main section-->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <div class="container-fluid">
                <div class="page-header">
                    <h2>DATA PRIORITY</h2>
                </div>
                <!-- Basic Examples -->
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="body">
                                <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap dataTable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Priority</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Priority</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php
                                            if($result['hasil'] > 0)
                                            {
                                                $i = 1;
                                                foreach($result['data'] as $isidata)
                                                {
                                                    ?>
                                                    <tr>
                                                        <td><?php echo $i++;?></td>
                                                        <td><?php echo $isidata->priority;?></td>
                                                        <td>
                                                            <center>
                                                                <button class="edit" data-id="<?php echo $isidata->id_priority;?>" data-prio="<?php echo $isidata->priority;?>" data-toggle='tooltip' data-placement='bottom' title='Update Data'>
                                                                    <i class='material-icons'>mode_edit</i>
                                                                </button>
                                                                <form onSubmit='return checkSub();' action='<?php echo base_url('app/deletePrio');?>' method='POST' style='display: inline;'>
                                                                    <input type='hidden' class='form-control' name='id_priority' value='<?php echo $isidata->id_priority;?>'/>
                                                                    <button type='submit' data-toggle='tooltip' data-placement='bottom' title='Delete Data'>
                                                                        <i class='material-icons'>delete</i>
                                                                    </button>
                                                                </form>
                                                                <script>
                                                                    function checkSub()
                                                                    {
                                                                        return confirm('Apakah Anda tetap ingin melanjutkan ? Tindakan menghapus data ini tidak bisa dibatalkan.');
                                                                    }
                                                                </script>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                            }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Basic Examples -->
            </div>

            <button id="btntambahf" class="float">
                <i class="fa fa-plus my-float"></i>
            </button>

                                            <div id="myModalUp" class="modal">
												<div class="modal-content">
													<div class="modal-header">
														<center><h3>Form Update Data Priority</h3></center>
													</div>
													<div class="modal-body">
														<form action="<?php echo base_url('app/updatePrio');?>" method="POST">
															<div class="form-group">
                                                                <div class="col-sm-12">
                                                                    <div class="form-line">
                                                                        <label>ID Priority</label>
                                                                        <input type="text" class="form-control id" name="id" id="id" readonly required/>
                                                                    </div>
                                                                    <div class="form-line">
                                                                        <label>Priority</label>
                                                                        <input type="text" class="form-control prio" name="prio" id="prio" required/>
                                                                    </div>
                                                                    <br>
                                                                </div>
															</div>
                                                            
															<button type="submit" class="w3-button w3-block w3-theme-l1">Simpan Perubahan</button>
															<br/>
														</form>
                                                        <button class="w3-button w3-block w3-theme-l4 closeUp">Batalkan</button>
                                                        <br/>
													</div>
												</div>
											</div>

											<div id="myModalf" class="modal">
												<div class="modal-content">
													<div class="modal-header">
														<span class="closef">&times;</span>
														<center><h3>Form Tambah Data Priority</h3></center>
													</div>
													<div class="modal-body">
														<form action="<?php echo base_url('app/createPrio');?>" method="POST">
															<div class="form-group">
                                                                <div class="col-sm-12">
                                                                    <div class="form-line">
                                                                        <label>Priority</label>
                                                                        <input type="text" class="form-control" name="prio" id="prio" required/>
                                                                    </div>
                                                                    <br>
                                                                </div>                                                                
															</div>
                                                            
															<button type="submit" class="w3-button w3-block w3-theme-l1">Simpan Data</button>
															<br/>
														</form>
													</div>
												</div>
											</div>

        </div>
    </section>
    <!-- FOOTER-->
    <footer>
        <span>&copy; 2017 - Eagle Template By <b class="col-blue">Bylancer</b></span>
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

<!--THIS PAGE LEVEL JS-->
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/dataTables.keyTable.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/dataTables.responsive.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/responsive.bootstrap.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/dataTables.scroller.min.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/jquery-datatable/extensions/export/dataTables.fixedHeader.min.js"></script>

<script src="<?php echo base_url('assetss');?>/assets/js/pages/tables/jquery-datatable.js"></script>

<!-- LAYOUT JS -->
<script src="<?php echo base_url('assetss');?>/assets/js/demo.js"></script>
<script src="<?php echo base_url('assetss');?>/assets/js/layout.js"></script>

<script>
    $(document).ready(function(){
        $('#datatable-responsive').on('click', '.edit', function(){
            var id = $(this).data('id');
            var prio = $(this).data('prio');
            var modalUp = document.getElementById('myModalUp');
            modalUp.style.display = "block";
            $('.id').val(id);
            $('.prio').val(prio);
        });

        $('#myModalUp ').on('click', '.closeUp', function(){
            var modalUp = document.getElementById('myModalUp');
            modalUp.style.display = "none";
        });
    });
</script>

							<script>
								var modalf = document.getElementById('myModalf');
								var btntambahf = document.getElementById("btntambahf");
								var spanf = document.getElementsByClassName("closef")[0];

								btntambahf.onclick = function()
								{
									modalf.style.display = "block";
								}
								
								spanf.onclick = function()
								{
                                    document.getElementById("prio").value = "";
									modalf.style.display = "none";
								}

								/*
								window.onclick = function(event)
								{
									if (event.target == modalf)
									{
                                        document.getElementById("prio").value = "";
										modalf.style.display = "none";
									}
								}
								*/
							</script>
</body>

</html>