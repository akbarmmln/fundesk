<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk - Register</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" type="image/x-icon">

    <!-- Bootstrap Core Css -->
    <link href="<?php echo base_url('assetss');?>/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="<?php echo base_url('assetss');?>/plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="<?php echo base_url('assetss');?>/plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="<?php echo base_url('assetss');?>/assets/css/style.css" rel="stylesheet">
</head>

<body class="register-ac">
    <div class="register-box">
        <div class="card">
            <div class="body">
                <!-- <div class="row">
                    <div class="col-lg-12">
                        <div class="login-logo">
                            <img src="<?php echo base_url('assetss/assets/images/icon_mt.png');?>" width="100" alt="" class="img-responsive img-circle align-center">
                        </div>
                    </div>
                </div> -->
                <form id="register" action="<?php echo base_url('login/pdaftar');?>" method="POST">
                    <div class="msg">Create an account</div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="username" placeholder="Username" required autofocus>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="fn" placeholder="Firstname" required autofocus>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="ln" placeholder="Lastname" required autofocus>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line">
                            <input type="email" class="form-control" name="email" placeholder="Email Address" required>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" name="password" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" name="confirm" placeholder="Confirm Password" required>
                        </div>
                    </div>
                    <button class="btn btn-block btn-primary waves-effect" type="submit">REGISTER NOW</button>
                </form>
            </div>
        </div>
    </div>

    <!-- CORE PLUGIN JS -->
    <script src="<?php echo base_url('assetss');?>/plugins/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/bootstrap/js/bootstrap.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/node-waves/waves.js"></script>
    <script src="<?php echo base_url('assetss');?>/plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!--THIS PAGE LEVEL JS-->
    <script src="<?php echo base_url('assetss');?>/plugins/jquery-validation/jquery.validate.js"></script>
    <script src="<?php echo base_url('assetss');?>/assets/js/pages/examples/register.js"></script>

    <!-- LAYOUT JS -->
    <script src="<?php echo base_url('assetss');?>/assets/js/demo.js"></script>

</body>

</html>