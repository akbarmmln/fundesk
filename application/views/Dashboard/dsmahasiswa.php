<?php
    error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_ticket');
    $CI->load->model('api_reward');
    $CI->load->model('api_users');

    $getuser = $CI->api_users->findUser($this->session->userdata('user_id'));

    $all = $CI->api_ticket->allTicketByLev($this->session->userdata('user_id'));
    $allRewards = $CI->api_reward->dataReward();
    $forall = $allRewards['hasil'];
    $for = round($forall/4);
    $a = is_float($forall/4);
    if($a)
    {
        $for = $for + 1;
    }

    $resultMy = $this->api_reward->myreward($this->session->userdata('user_id'));
    $forallmy = $resultMy['hasil'];
    $forMy = round($forallmy/4);
    $aMy = is_float($forallmy/4);
    if($aMy)
    {
        $forMy = $forMy + 1;
    }

    $rhistory = $this->api_reward->history($this->session->userdata('user_id'));
    $forallHist = $rhistory['hasil'];
    $forHist = round($forallHist/4);
    $aHist = is_float($forallHist/4);
    if($aHist)
    {
        $forHist = $forHist + 1;
    }
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
                    <h2>DASHBOARD</h2>
                </div>

                                        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                                            <!-- Indicators -->
                                            <ol class="carousel-indicators">
                                                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                            </ol>

                                            <!-- Wrapper for slides -->
                                            <div class="carousel-inner" role="listbox">
                                                <div class="item active">
                                                    <img src="<?php echo base_url('assetss');?>/assets/images/slide1.jpg" />
                                                </div>
                                                <div class="item">
                                                    <img src="<?php echo base_url('assetss');?>/assets/images/slide1.jpg" />
                                                </div>
                                                <div class="item">
                                                    <img src="<?php echo base_url('assetss');?>/assets/images/slide1.jpg" />
                                                </div>
                                            </div>

                                            <!-- Controls -->
                                            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </div><br>
                                        
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="body table-responsive">
                                <!-- <div class="widget_card_header">
                                    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Cari Berdasarkan Subjek Tiket atau Tanggal Tiket dibuat (2019-31-01)" class="form-control">
                                </div> -->
                                <table id="tables" class="table">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </br>

                <div class="row clearfix">
                    <div class="col-lg-12">
                        <!-- Modal -->
                        <div class="modal fade" id="defaultmodal" tabindex="-1" role="dialog" aria-labelledby="memberModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                        <h4 class="modal-title" id="memberModalLabel"><center>Rincian Data / Historical Ticket</center></h4>
                                    </div>
                                    <div class="dash">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row clearfix" >
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div class="card">
                            <div class="weather-widget-top">
                                <div class="row margin-0">
                                    <div class="weather-widget-left col-md-2 col-sm-5">
                                        <div class="row margin-0">
                                            <div class="col-xs-12">
                                                <figure class="icons">
                                                    <center>
                                                        <h6><?php echo $getuser['data'][0]->badges;?></h6>
                                                        <img width="100" height="100" src="<?php echo base_url('/assetss/assets/images/piala.png');?>"/>
                                                    </center>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9 col-sm-7">
                                        <div class="row margin-0">
                                            <div class="weather-widget-last col-xs-4">
                                                <h6><b>EXP</b></h6>
                                                <figure class="icons">
                                                    <img width="50" height="50" src="<?php echo base_url('/assetss/assets/images/exp.png');?>"/>
                                                </figure>
                                                <p><b><?php echo $getuser['data'][0]->poin_xp;?></b></p>
                                            </div>
                                            <div class="weather-widget-last col-xs-4">
                                                <h6><b>Poin</b></h6>
                                                <figure class="icons">
                                                    <img width="50" height="50" src="<?php echo base_url('/assetss/assets/images/pointrew.png');?>"/>
                                                </figure>
                                                <p><b><?php echo $getuser['data'][0]->poin_rp;?></b></p>
                                            </div>
                                            <div class="weather-widget-last col-xs-4">
                                                <h6><b>Level</b></h6>
                                                <figure class="icons">
                                                    <img width="50" height="50" src="<?php echo base_url('/assetss/assets/images/level.png');?>"/>
                                                </figure>
                                                <p><b><?php echo $getuser['data'][0]->levels;?></b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--row-->
                <div class="row clearfix">
                    <div class="col-lg-3">
                        <a href="javascript:void(0);">
                            <div class="widget style2 bg-indigo">
                                <div class="col-xs-4 widget-icon">
                                    <i class="fa fa-ticket"></i>
                                </div>
                                <div class="col-xs-8 widget-body text-right">
                                    <span> Tiket Anda </span>
                                    <h2><?php echo $all['hasil'];?></h2>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-lg-3">
                        <a href="<?php echo base_url('app/newtickets');?>">
                            <div class="widget style2 bg-cyan">
                                <div class="col-xs-4 widget-icon">
                                    <i class="fa fa-edit"></i>
                                </div>
                                <div class="col-xs-8 widget-body text-right">
                                    <span> Laporkan Masalah </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style2 bg-green">
                            <div class="col-xs-4 widget-icon">
                                <i class="fa fa-thumbs-o-up"></i>
                            </div>
                            <div class="col-xs-8 widget-body text-right">
                                <span>Solusi </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <a href="<?php echo base_url('app/leaderboards');?>">
                            <div class="widget style2 bg-red">
                                <div class="col-xs-4 widget-icon">
                                    <i class="icon-display fa fa-bar-chart"></i>
                                </div>
                                <div class="col-xs-8 widget-body text-right">
                                    <span> Leaderboard </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <!--row-->

                <!-- Tabs Noborder -->
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="body">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <!-- Example Vertical Tabs Left Noborder-->
                                        <div class="card-inner">
                                            <div class="demo">
                                                <div class="row">
                                                    <div class="col-md-2">
                                                        <!-- Nav tabs -->
                                                        <ul class="nav nav-tabs nav-tabs-noborder nav-vertical-tabs" role="tablist">
                                                            <li role="presentation" class="active"><a href="#home-Vertical-noborder" data-toggle="tab">Semua Rewards Tersedia</a></li>
                                                            <li role="presentation"><a href="#profile-Vertical-noborder" data-toggle="tab">Rewards yang Dapat Ditukarkan</a></li>
                                                            <li role="presentation"><a href="#messages-Vertical-noborder" data-toggle="tab">Rewards yang Telah Ditukarkan</a></li>
                                                        </ul>
                                                    </div>
                                                    <div class="col-md-10">
                                                        <!-- Tab panes -->
                                                        <div class="tab-content vertical-content">
                                                            <div role="tabpanel" class="tab-pane fade in active" id="home-Vertical-noborder">
                                                                <div class="body table-responsive">
                                                                <table id="tables" class="table">
                                                                    <thead>
                                                                    <?php
                                                                        $k=0;
                                                                        for($i=0; $i<$for; $i++)
                                                                        {
                                                                            $sa = $i + 1;
                                                                            $x = 4 * $sa;
                                                                            echo "<tr>";
                                                                            for($j=$k; $j<$x; $j++)
                                                                            {
                                                                                if($allRewards['data'][$j] == '' || empty($allRewards['data'][$j]))
                                                                                {
                                                                                    break;
                                                                                }
                                                                                ?>
                                                                                <th>
                                                                                    <div class="card">
                                                                                        <div class="body">
                                                                                            <center>
                                                                                                <img alt="no image" width="100" heigth="50" src="<?php echo 'data:jpeg;base64,'.base64_encode($allRewards['data'][$j]->gambar);?>"/>
                                                                                                <br>
                                                                                                <p><?php echo $allRewards['data'][$j]->reward;?></p>
                                                                                                <p><?php echo $allRewards['data'][$j]->poin;?> Poin</p>
                                                                                            </center>
                                                                                        </div>
                                                                                    </div>
                                                                                </th>
                                                                                <?php
                                                                            }
                                                                            $k=$j;
                                                                            echo "</tr>";
                                                                        }
                                                                    ?>
                                                                    </thead>
                                                                </table>
                                                                </div>
                                                            </div>
                                                            <div role="tabpanel" class="tab-pane fade" id="profile-Vertical-noborder">
                                                                <div class="body table-responsive">
                                                                <table id="tables" class="table">
                                                                    <thead>
                                                                    <?php
                                                                        $k=0;
                                                                        if($forMy == 0)
                                                                        {
                                                                            echo "Tidak ada reward yang bisa ditukarkan";
                                                                        }

                                                                        for($i=0; $i<$forMy; $i++)
                                                                        {
                                                                            $sa = $i + 1;
                                                                            $x = 4 * $sa;
                                                                            echo "<tr>";
                                                                            for($j=$k; $j<$x; $j++)
                                                                            {
                                                                                if($resultMy['data'][$j] == '' || empty($resultMy['data'][$j]))
                                                                                {
                                                                                    break;
                                                                                }
                                                                                ?>
                                                                                <th>
                                                                                    <div class="card">
                                                                                        <div class="body">
                                                                                            <a href="<?php echo base_url('app/tukarpoint/'.$resultMy['data'][$j]->id_reward);?>">
                                                                                                <center>
                                                                                                    <img alt="no image" width="100" heigth="50" src="<?php echo 'data:jpeg;base64,'.base64_encode($resultMy['data'][$j]->gambar);?>"/>
                                                                                                    <br>
                                                                                                    <p><?php echo $resultMy['data'][$j]->reward;?></p>
                                                                                                    <p><?php echo $resultMy['data'][$j]->poin;?> Poin</p>
                                                                                                </center>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </th>
                                                                                <?php
                                                                            }
                                                                            $k=$j;
                                                                            echo "</tr>";
                                                                        }
                                                                    ?>
                                                                    </thead>
                                                                </table>
                                                                </div>
                                                            </div>
                                                            <div role="tabpanel" class="tab-pane fade" id="messages-Vertical-noborder">
                                                                <div class="body table-responsive">
                                                                <table id="tables" class="table">
                                                                    <thead>
                                                                    <?php
                                                                        $k=0;
                                                                        if($forHist == 0)
                                                                        {
                                                                            echo "Tidak ada reward yang telah ditukarkan";
                                                                        }

                                                                        for($i=0; $i<$forHist; $i++)
                                                                        {
                                                                            $sa = $i + 1;
                                                                            $x = 4 * $sa;
                                                                            echo "<tr>";
                                                                            for($j=$k; $j<$x; $j++)
                                                                            {
                                                                                if($rhistory['data'][$j] == '' || empty($rhistory['data'][$j]))
                                                                                {
                                                                                    break;
                                                                                }
                                                                                ?>
                                                                                <th>
                                                                                    <div class="card">
                                                                                        <div class="body">
                                                                                                <center>
                                                                                                    <img alt="no image" width="100" heigth="50" src="<?php echo 'data:jpeg;base64,'.base64_encode($rhistory['data'][$j]->gambar);?>"/>
                                                                                                    <br>
                                                                                                    <p><?php echo $rhistory['data'][$j]->reward;?></p>
                                                                                                    <p><?php echo $rhistory['data'][$j]->poin;?> Poin</p>
                                                                                                </center>
                                                                                        </div>
                                                                                    </div>
                                                                                </th>
                                                                                <?php
                                                                            }
                                                                            $k=$j;
                                                                            echo "</tr>";
                                                                        }
                                                                    ?>
                                                                    </thead>
                                                                </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Example Vertical Tabs Left Noborder-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Tabs Noborder-->


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
    <script>
        $('#defaultmodal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever') // Extract info from data-* attributes
            var modal = $(this);
            var dataString = 'target='+recipient;
            $.ajax({
                url: '<?php echo base_url('app/datatarget')?>',
                method: 'post',
                data: dataString,
                cache: true,
                success: function (data) {
                    modal.find('.dash').html(data);
                },
                error: function(err) {
                    // alert(err);
                }
            });
        })
    </script>

    <script type='text/javascript'>
        function fetchdata(){
            var ref = '<?php echo $this->session->userdata('user_id')?>';
            var dataString = 'ref='+ref;
            
            $.ajax({
                url: '<?php echo base_url('app/data')?>',
                method: 'post',
                data: dataString,
                success: function(response){
                    $('#tables').html(response);
                },
                error: function(err) {
                    // alert(err);
                }
            });
        }

        $(document).ready(function(){
            setInterval(fetchdata,1000);
        });
    </script>
</body>

</html>