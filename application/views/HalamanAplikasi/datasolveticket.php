<?php
    //error_reporting(E_ALL ^ E_NOTICE);
    $CI =& get_instance();
    $CI->load->model('api_ticket');
    $result = $this->api_ticket->solveTicket($this->session->userdata('user_id'), $this->session->userdata('user_akses'));
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Tiket Solve</title>
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
                    <h2>DATA TIKET SELESAI</h2>
                </div>
                <!-- Basic Examples -->
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="body">
                                <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap dataTable" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Nomor Tiket</th>
                                            <th>Tanggal Pelaporan</th>
                                            <th>Subjek</th>
                                            <th>Rincian Masalah</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Nomor Tiket</th>
                                            <th>Tanggal Pelaporan</th>
                                            <th>Subjek</th>
                                            <th>Rincian Masalah</th>
                                            <th>Status</th>
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
                                                        <td><a href="<?php echo base_url('app/ticket/details/'.$isidata->tiket_number);?>"><?php echo $isidata->tiket_number;?></a></td>
                                                        <td><?php echo $isidata->reported_date;?></td>
                                                        <td><?php echo $isidata->problem_summary;?></td>
                                                        <td><?php echo $isidata->problem_detail;?></td>
                                                        <td><?php echo $isidata->problem_status;?></td>
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
</body>

</html>