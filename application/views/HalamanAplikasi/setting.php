<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_setting');
	$result = $CI->api_setting->data();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Setting</title>
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
                    <h2>SETTING</h2>
                </div>

                <!--row-->
                <div class="row" id="masonry">
                    <!-- Sparkline Chart Widget -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 masonry-item">
                        <div class="card">
                            <div class="body">
                                <div>
                                    <div class="demo">
                                        <form action="<?php echo base_url('app/updateSetting');?>" class="form-horizontal" id="form_validation" method="POST">
                                            <div class="row">
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="hidden" class="form-control" name="id" placeholder="ID" value="<?php echo $result['data'][0]->st_id;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Nama Lembaga</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" name="nl" placeholder="Nama Lembaga" value="<?php echo $result['data'][0]->nama_lembaga;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-t-10">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Alamat</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" name="alt" placeholder="Alamat Lembaga" value="<?php echo $result['data'][0]->alamat;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-t-10">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Telepon</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="number" class="form-control" name="notelp" placeholder="Nomor Telepon" value="<?php echo $result['data'][0]->telepon;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-t-10">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Email</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="email" class="form-control" name="email" placeholder="Email" value="<?php echo $result['data'][0]->email;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-t-10">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Point XP</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="number" class="form-control" name="xp" placeholder="Point XP" value="<?php echo $result['data'][0]->poin_xp;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-t-10">
                                                <div class="col-md-3 col-xs-4 col-xs-4 form-control-label">
                                                    <label>Point RP</label>
                                                </div>
                                                <div class="col-md-9 col-xs-8 col-xs-8">
                                                    <div class="form-group">
                                                        <input type="number" class="form-control" name="rp" placeholder="Point RP" value="<?php echo $result['data'][0]->poin_rp;?>" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary waves-effect m-l-100" type="submit">SUBMIT</button>
                                        </form>
                                    </div>
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