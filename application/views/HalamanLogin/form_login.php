<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Helpdesk | Log In</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo base_url('assetss');?>/assets/images/logohpdeski.png" type="image/x-icon">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="<?php echo base_url('assetss/plugins/bootstrap/css/bootstrap.css');?>" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="<?php echo base_url('assetss/plugins/node-waves/waves.css');?>" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="<?php echo base_url('assetss/plugins/animate-css/animate.css');?>" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="<?php echo base_url('assetss/assets/css/style.css');?>" rel="stylesheet">
</head>

<body class="login-page">
    <div class="login-box">
        <div class="card">
            <div class="body">
                <!-- <div class="row">
                    <div class="col-lg-12">
                        <div class="login-logo">
                            <img src="<?php echo base_url('assetss/assets/images/icon_mt.png');?>" width="100" alt="logo-depan" class="img-responsive img-circle align-center">
                            <p>HelpDesk Login</p>
                        </div>
                    </div>
                </div> -->
                <form id="log_in" method="POST" action="<?php echo base_url('login/proseslogin'); ?>">
                    <div class="msg">HelpDesk Login</div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username" required autofocus>
                        </div>
                    </div>
                    <div class="input-group addon-line">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 align-right p-t-5">
                            <a href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                    <button class="btn btn-block btn-primary waves-effect" type="submit">LOG IN</button>
                </form>
				<script>
					document.getElementById('username').onkeydown = function (event) {
					  var event = event || window.event;  // get event object
					  var key = event.keyCode || event.which; // get key cross-browser
					  
					  if (key == 32) { //Space bar key code
						//Prevent default action, which is inserting space
						if (event.preventDefault) event.preventDefault(); //normal browsers
						event.returnValue = false; //IE
					  }
					};
					
					document.getElementById('password').onkeydown = function (event) {
					  var event = event || window.event;  // get event object
					  var key = event.keyCode || event.which; // get key cross-browser
					  
					  if (key == 32) { //Space bar key code
						//Prevent default action, which is inserting space
						if (event.preventDefault) event.preventDefault(); //normal browsers
						event.returnValue = false; //IE
					  }
					};
				</script>
            </div>
        </div>
    </div>

    <!-- CORE PLUGIN JS -->
    <script src="<?php echo base_url('assetss/plugins/jquery/jquery.min.js');?>"></script>
    <script src="<?php echo base_url('assetss/plugins/bootstrap/js/bootstrap.js');?>"></script>
    <script src="<?php echo base_url('assetss/plugins/node-waves/waves.js');?>"></script>
    <script src="<?php echo base_url('assetss/plugins/jquery-slimscroll/jquery.slimscroll.jsg');?>"></script>

    <!--THIS PAGE LEVEL JS-->
    <script src="<?php echo base_url('assetss/plugins/jquery-validation/jquery.validate.js');?>"></script>
    <script src="<?php echo base_url('assetss/assets/js/pages/examples/login.js');?>"></script>

    <!-- LAYOUT JS -->
    <script src="<?php echo base_url('assetss/assets/js/demo.js');?>"></script>

</body>

</html>