<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_profil');
	$result = $CI->api_profil->getProfil($this->session->userdata('user_id'));
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Profil User</title>
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
                    <h2>PROFIL PENGGUNA</h2>
                </div>

                <!--row-->
                <div class="row" id="masonry">
                    <!-- Sparkline Chart Widget -->
                    <form action="<?php echo base_url('profile/renewprofile');?>" method="post" enctype="multipart/form-data">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="body">
                                        <input type="hidden" class="form-control" name="id" placeholder="Nama Depan" value="<?php echo $result['data'][0]->user_id;?>" required/>
                                        <div class="form-group">
                                            <label>Nama Depan</label>
                                            <input type="text" class="form-control" name="nd" placeholder="Nama Depan" value="<?php echo $result['data'][0]->user_first_name;?>" required/>
                                        </div>
                                        <div class="form-group">
                                            <label>Nama Akhir</label>
                                            <input type="text" class="form-control" name="na" placeholder="Nama Akhir" value="<?php echo $result['data'][0]->user_last_name;?>" required/>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat</label>
                                            <input type="text" class="form-control" name="alt" placeholder="Alamat Tinggal" value="<?php echo $result['data'][0]->address;?>" required/>
                                        </div>
                                        <div class="form-group">
                                            <label>Nomor HP (format: xxxx-xxxx-xxxx)</label>
                                            <input type="text" class="form-control" name="notelp" placeholder="Nomor HP" pattern="^\d{4}-\d{4}-\d{4}$" value="<?php echo $result['data'][0]->user_phone;?>" required/>
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control" name="em" placeholder="Email" value="<?php echo $result['data'][0]->user_email;?>" required/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <!--Basic Form Elements-->
                        <!--Horizontal Form Elements-->
                        <div class="col-md-6">
                            <div class="card">
                                <div class="body">
                                        <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Gambar Profile</label>
                                                        <img class="form-control" id="uploadPreview1" style="width: 150px; height: 150px;" src="<?php echo 'data:jpeg; base64,' . base64_encode($result['data'][0]->image1); ?>">
                                                        <input id="uploadImage1" type="file" name="foto1" onchange="PreviewImageProfile();">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Gambar Latar</label>
                                                        <img class="form-control" id="uploadPreview2" style="width: 150px; height: 150px;" src="<?php echo 'data:jpeg; base64,' . base64_encode($result['data'][0]->image2); ?>">
                                                        <input id="uploadImage2" type="file" name="foto2" onchange="PreviewImageLatar();">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Point XP didapat</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $result['data'][0]->poin_xp;?> Point</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <!-- <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Point RP didapat</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label><?php echo $result['data'][0]->poin_rp;?> Reward</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <!-- <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Level</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <label>Jumlah Level</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="row clearfix">
                                            <div class="col-sm-6">
                                                <button type="submit" class="btn btn-primary btn-rounded waves-effect">Simpan Perubahan</button>
                                            </div>
                                            <div class="col-sm-6">
                                                <a href="<?php echo base_url('app');?>" type="button" class="btn btn-danger btn-rounded waves-effect">Batalkan</a>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>                    
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
	<script type="text/javascript">
		function PreviewImageProfile()
		{
			var $jnock = jQuery.noConflict();
			var oFReader = new FileReader();
			oFReader.readAsDataURL(document.getElementById("uploadImage1").files[0]);
				oFReader.onload = function (oFREvent)
			{
				document.getElementById("uploadPreview1").src = oFREvent.target.result;
			};
		};
	</script>
	<script type="text/javascript">
		function PreviewImageLatar()
		{
			var $jnock = jQuery.noConflict();
			var oFReader = new FileReader();
			oFReader.readAsDataURL(document.getElementById("uploadImage2").files[0]);
				oFReader.onload = function (oFREvent)
			{
				document.getElementById("uploadPreview2").src = oFREvent.target.result;
			};
		};
	</script>
</body>

</html>