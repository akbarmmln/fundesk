<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_category');
    $CI->load->model('api_profil');
    
    $result = $CI->api_category->dataCategory();
    $dataprof = $CI->api_profil->getProfil($this->session->userdata('user_id'));
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Tiket Baru</title>
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
    <?php $this->view('Dashboard/sidermahasiswa');?>
    
    <!-- Main section-->
    <section>
        <!-- Page content-->
        <div class="content-wrapper">
            <div class="container-fluid">
                <div class="page-header">
                    <h2>TIKET BARU</h2>
                </div>

                <!--row-->
                <div class="row clearfix">
                    <div class="card">
                        <div class="body">
                            <div class="form-body">
                                <form method="POST" action="<?php echo base_url('ticket/new');?>" enctype="multipart/form-data">
                                    <div class="row">
                                        <atricle class="col-sm-12 col-md-12 col-lg-6">
                                            <input name="id_user" id="id_user" value="<?php echo $dataprof['data'][0]->user_id;?>" readonly="readonly" required class="form-control" type="hidden">
                                            <div class="form-group">
                                                <label>Reported By</label>
                                                <input name="by" id="by" placeholder="Reported By" value="<?php echo $dataprof['data'][0]->user_first_name.' '.$dataprof['data'][0]->user_last_name;?>" readonly="readonly" required class="form-control" type="text">
                                            </div>
                                        </atricle>
                                        <article class="col-sm-12 col-md-12 col-lg-3">
                                            <div class="form-group">
                                                <label>Telp</label>
                                                <input name="telp" id="telp" placeholder="Telepon" required class="form-control" type="number">                                
                                            </div>
                                        </article>
                                        <article class="col-sm-12 col-md-12 col-lg-3">
                                            <div class="form-group">
                                                <label>Category</label>
                                                <select name="idcat" id="idcat" required class="form-control">
                                                    <?php
                                                        for($i=0; $i<count($result['data']); $i++)
                                                        {
                                                            ?>
                                                            <option value="<?php echo $result['data'][$i]->id_category;?>"><?php echo $result['data'][$i]->category;?></option>
                                                            <?php
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                        </article>
                                    </div>
                                    <div class="row">
                                        <article class="col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label>Site</label>
                                                <input name="site" id="site" placeholder="Problem Site" value="UIN JKT" required readonly class="form-control" type="text">
                                            </div>
                                            <div class="form-group">
                                                <label>Subjek</label>
                                                <input name="ps" id="ps" placeholder="Problem Summary" class="form-control" required type="text">
                                            </div>
                                            <div class="form-group">
                                                <label>Message</label>
                                                <textarea name="pd" class="form-control" id="pd" required placeholder="Problem Detail"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label>Attach File</label>
                                                <input name="file" id="file" class="form-control" type="file">
                                            </div>
                                            <div class="row clearfix">
                                                <div class="col-sm-6">
                                                    <button type="submit" class="btn btn-primary btn-rounded waves-effect">Simpan</button>
                                                </div>
                                                <div class="col-sm-6">
                                                    <a href="<?php echo base_url('app');?>" type="button" class="btn btn-danger btn-rounded waves-effect">Batalkan</a>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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