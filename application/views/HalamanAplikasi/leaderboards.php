<?php
    // error_reporting(E_ALL ^ E_NOTICE);
    $CI =& get_instance();
    $CI->load->model('api_users');
    $result = $this->api_users->ranking();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Leaderboards</title>
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
                    <h2>PERINGKAT POINT REWARD</h2>
                    <ol class="breadcrumb">
                        <li><a>Hanya menampilkan 100 data teratas</a></li>
                    </ol>
                </div>
                <!-- Basic Examples -->
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="body">
                                <div class="body table-responsive">
                                    <div class="widget_card_header">
                                        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Cari Berdasarkan Nama User" class="form-control">
                                    </div>
                                    <br>
                                    <table id="tables" class="table">
                                        <!-- <thead>
                                            <tr>
                                                <th>Nama User</th>
                                                <th>Point Reward</th>
                                                <th>Level</th>
                                                <th>Badges</th>
                                            </tr>
                                        </thead> -->
                                        <tbody>
                                            <?php
                                                if($result['hasil'] > 0)
                                                {
                                                    for($i=0; $i<$result['hasil']; $i++)
                                                    {
                                                        ?>
                                                        <tr>
                                                            <td><?php echo $result['data'][$i]->user_first_name.' '.$result['data'][$i]->user_last_name;?></td>
                                                            <td>
                                                                <div class="weather-widget-last col-xs-4">
                                                                    <figure>
                                                                        <img width="40" height="40" src="<?php echo base_url('/assetss/assets/images/pointrew.png');?>"/>
                                                                    </figure>
                                                                </div>
                                                                <p><b><?php echo $result['data'][$i]->poin_rp;?></b></p>
                                                            </td>
                                                            <td>
                                                                <div class="weather-widget-last col-xs-4">
                                                                    <figure>
                                                                        <img width="40" height="40" src="<?php echo base_url('/assetss/assets/images/level.png');?>"/>
                                                                    </figure>
                                                                </div>
                                                                <p><b><?php echo $result['data'][$i]->levels;?></b></p>
                                                            </td>
                                                            <td>
                                                                <div class="weather-widget-last col-xs-4">
                                                                    <figure>
                                                                        <img width="40" height="40" src="<?php echo base_url('/assetss/assets/images/piala.png');?>"/>
                                                                    </figure>
                                                                </div>
                                                                <p><b><?php echo $result['data'][$i]->badges;?></b></p>
                                                            </td>
                                                        </tr>
                                                        <?php
                                                    }
                                                }
                                            ?>
                                        </tbody>
                                    </table>
                                                        <script>
															function myFunction()
															{
																var input, filter, table, tr, td, i;
																input = document.getElementById("myInput");
																filter = input.value.toUpperCase();
																table = document.getElementById("tables");
																tr = table.getElementsByTagName("tr");
																for (i = 0; i < tr.length; i++)
																{
																	td = tr[i].getElementsByTagName("td")[0];
																	if (td)
																	{
																		if (td.innerHTML.toUpperCase().indexOf(filter) > -1)
																		{
																			tr[i].style.display = "";
																		}
																		else
																		{
																			tr[i].style.display = "none";
																		}
																	}
																}
															}
														</script>
                                </div>
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