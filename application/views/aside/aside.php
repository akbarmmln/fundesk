<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_profil');
    $CI->load->model('api_profil');

    $userid = $this->session->userdata('user_id');
    $result = $CI->api_profil->getProfil($userid);
    $lev = $result['data'][0]->level;
    if($lev == 1)
    {
        $lev = "Administrator";
    }
    else if($lev == 2)
    {
        $lev = "Staff";
    }
    else if($lev == 3)
    {
        $lev = "Mahasiswa";
    }
    else
    {
        $lev = "Tidak diketahui";
    }
	$result = $CI->api_profil->getProfil($this->session->userdata('user_id'));
?>
                <!-- START Right Navbar-->
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="javascript:void(0);" data-search-open="">
                            <em class="material-icons">search</em>
                        </a>
                    </li>
                    <?php
                        if($lev == 'Administrator')
                        {
                            ?>
                            <li>
                                <a href="<?php echo base_url('app/ticket/new-ticket');?>">
                                    <em class="material-icons">receipt</em>
                                    <span id='num'>0</span>
                                </a>
                            </li>
                            <?php
                        }
                    ?>
                    <!-- Task -->
                    <li class="dropdown">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
                            <i class="material-icons">account_circle</i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="body">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 masonry-item">
                                    <div class="card">
                                        <div class="cover_bg height150" style="background-image: url(data:image/jpeg;base64,<?php echo base64_encode($result['data'][0]->image2);?>); background-repeat: no-repeat; background-size: 300px 200px;"></div>
                                        <div class="body">
                                            <a class="card-profile-img fl-right" href="javascript:;"><img alt="NO IMAGE" src="<?php echo 'data:jpeg;base64,' . base64_encode($result['data'][0]->image1); ?>"></a>
                                            <h3 class="m-t-0"><?php echo $result['data'][0]->user_first_name;?> <?php echo $result['data'][0]->user_last_name;?>
                                            <br><small><?php echo $lev;?></small></h3>
                                        </div>
                                        <?php
                                            if($lev == "Administrator" || $lev == "Staff")
                                            {
                                                ?>
                                                <div class="card-footer-bordered">
                                                        <div class="row">
                                                            <div class="col-xs-4 border-right">
                                                                <div class="align-center">
                                                                    <label>Point XP</label><br>
                                                                    <span><?php echo $result['data'][0]->poin_xp;?></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-4 border-right">
                                                                <div class="align-center">
                                                                    <label>Point RP</label><br>
                                                                    <span><?php echo $result['data'][0]->poin_rp;?></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-4 border-right">
                                                                <div class="align-center">
                                                                    <label>Level</label><br>
                                                                    <span><?php echo $result['data'][0]->levels;?></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <?php
                                            }
                                        ?>
 
                                        <div class="card-footer-bordered">
                                            <div class="row">
                                                <div class="col-xs-4 border-right">
                                                    <div class="align-center">
                                                        <form action="<?php echo base_url('app/profsetting');?>" method="POST">
                                                            <button type="submit" class="btn btn-danger btn-circle-lg waves-effect waves-circle waves-float" data-toggle="tooltip" data-placement="bottom" title="Pengaturan Profil">
                                                                <i class="material-icons">settings</i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="col-xs-4 border-right">
                                                    <div class="align-center">
                                                        <form action="" method="POST">
                                                            <button type="submit" class="btn btn-danger btn-circle-lg waves-effect waves-circle waves-float" data-toggle="tooltip" data-placement="bottom" title="Change Password">
                                                                <i class="material-icons">lock</i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="col-xs-4 border-right">
                                                    <div class="align-center">
                                                        <form action="<?php echo base_url('login/logout')?>" method="POST">
                                                            <button type="submit" class="btn btn-danger btn-circle-lg waves-effect waves-circle waves-float" data-toggle="tooltip" data-placement="bottom" title="Logout">
                                                                <i class="material-icons">exit_to_app</i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- #END# Task -->
                </ul>
                <!-- #END# Right Navbar-->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type='text/javascript'>
    function fetchdata(){
        $.ajax({
            url: '<?php echo base_url('app/newBrif')?>',
            method: 'post',
            dataType: 'json',
            success: function(response){
                // alert(response);
                $('#num').text(response);
            }
        });
    }

    $(document).ready(function(){
        var lev = '<?php echo $result['data'][0]->level;?>';
        if(lev == 1)
        {
            setInterval(fetchdata,1000);
        }
    });
</script>