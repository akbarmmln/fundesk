<?php
    // error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_survey');
    $getsurvey = $CI->api_survey->getUraian();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Survey</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" type="image/x-icon">
    <!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"> -->

    <!--THIS PAGE LEVEL CSS-->
    <link href="<?php echo base_url('assetss');?>/plugins/nifty-modal/component.css" rel="stylesheet" />

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
                    <h2>Survey</h2>
                </div>
                <div class="row clearfix" >
                    <!-- Weather Widget -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div class="card">
                            <div class="body table-responsive">
                                <form method="POST" action="<?php echo base_url('app/insurvey');?>">
                                <table id="tables" class="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Uraian</th>
                                                <th>Kepuasan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            $i=1;
                                            foreach($getsurvey['data'] as $isidata)
                                            {
                                                ?>
                                                <tr>
                                                    <td><?php echo $i;?></td>
                                                    <td><?php echo $isidata->uraian;?></td>
                                                    <td>
                                                        <input type='hidden' class='form-control' name='idk[]' value='<?php echo $isidata->id;?>'/>
                                                        <select class="form-control" name="kepuasan[]" required>
                                                            <option value="">Pilih</option>
															<option value="1">Sangat Tidak Puas</option>
															<option value="2">Tidak Puas</option>
															<option value="3">Puas</option>
															<option value="4">Sangat Puas</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <?php
                                                $i++;
                                            }
                                            ?>
                                        </tbody>
                                </table>
                                <button id="btnsubmit" class="btn btn-primary waves-effect" type="submit">SUBMIT</button><br><br>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- #END# Weather Widget -->
                </div>
            </div>
        </div>
    </section>
    <!-- FOOTER-->
    <footer>
        <span>&copy; 2019 - Helpdesk By <b class="col-blue">Adi Muhtadi</b></span>
    </footer>
</div>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->

    <!-- CORE PLUGIN JS -->
    <script src="<?php echo base_url('assetss');?>/plugins/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/bootstrap/js/bootstrap.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/modernizr/modernizr.custom.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/screenfull/dist/screenfull.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/jQuery-Storage-API/jquery.storageapi.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/node-waves/waves.js"></script>

    <!--THIS PAGE LEVEL JS-->
<script src="<?php echo base_url('assetss');?>/plugins/bootstrap-notify/bootstrap-notify.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/nifty-modal/modalEffects.js"></script>
<script src="<?php echo base_url('assetss');?>/plugins/nifty-modal/classie.js"></script>
<script src="<?php echo base_url('assetss');?>/assets/js/pages/ui/modals.js"></script>

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