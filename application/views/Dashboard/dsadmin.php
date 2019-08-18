<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_ticket');
    $newTicket = $CI->api_ticket->newTicket($this->session->userdata('user_id'), $this->session->userdata('user_akses'));
    $openTicket = $CI->api_ticket->openTicket($this->session->userdata('user_id'), $this->session->userdata('user_akses'));
    $solveTicket = $CI->api_ticket->solveTicket($this->session->userdata('user_id'), $this->session->userdata('user_akses'));
    $closeTicket = $CI->api_ticket->closeTicket($this->session->userdata('user_id'), $this->session->userdata('user_akses'));
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Dashboard</title>
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
    <!--#End# Chat Css-->

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
    <?php $this->view('Dashboard/sideradmin');?>
    
    <!-- Main section-->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <div class="container-fluid">
                <div class="page-header">
                    <h2>DASHBOARD</h2>
                </div>
                <!--row-->
                <div class="row clearfix">
                    <div class="col-lg-3">
                        <div class="widget style2 bg-indigo">
                            <div class="col-xs-4 widget-icon">
                                <i class="material-icons">lock</i>
                            </div>
                            <div class="col-xs-8 widget-body text-right">
                                <span> New Tickets </span>
                                <h2><?php echo $newTicket['hasil'];?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style2 bg-green">
                            <div class="col-xs-4 widget-icon">
                                <i class="material-icons">lock_open</i>
                            </div>
                            <div class="col-xs-8 widget-body text-right">
                                <span> Open Tickets </span>
                                <h2><?php echo $openTicket['hasil'];?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style2 bg-cyan">
                            <div class="col-xs-4 widget-icon">
                                <i class="material-icons">check_circle_outline</i>
                            </div>
                            <div class="col-xs-8 widget-body text-right">
                                <span> Solved Tickets </span>
                                <h2><?php echo $solveTicket['hasil'];?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style2 bg-red">
                            <div class="col-xs-4 widget-icon">
                                <i class="material-icons">close</i>
                            </div>
                            <div class="col-xs-8 widget-body text-right">
                                <span> Closed    </span>
                                <h2><?php echo $closeTicket['hasil'];?></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!--row-->

                <!--row-->
                <div class="row" id="masonry">
                    <!-- Sparkline Chart Widget -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 masonry-item">
                        <div class="card">
                            <div class="body">
                                <div>
                                    <h4 class="text-center m-b-20">Problem</h4>
                                </div>
                            </div>
                            <div class="body">
                            </div>
                        </div>
                    </div>
                    <!-- #END# Sparkline Chart Widget -->
                </div>
                <!--row-->
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

</body>

</html>