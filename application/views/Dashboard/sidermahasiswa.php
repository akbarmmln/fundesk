<?php
    // error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_survey');
    $getdata = $CI->api_survey->ceksurvey($this->session->userdata('user_id'));
?>

<aside class="aside">
        <!-- START Sidebar (left)-->
        <div class="aside-inner">
            <nav data-sidebar-anyclick-close="" class="sidebar">
                <!-- START sidebar nav-->
                <ul class="nav menu">
                    <!-- Iterates over all sidebar items-->
                    <li class="nav-heading ">
                        <span>MAIN NAVIGATION</span>
                    </li>
                    <li>
                        <a href="<?php echo base_url('app')?>" title="Dashboard">
                            <em class="material-icons">dashboard</em>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tickets" title="Tickets" data-toggle="collapse" class="menu-toggle">
                            <em class="material-icons">receipt</em>
                            <span>Tickets</span>
                        </a>
                        <ul id="tickets" class="nav sidebar-subnav collapse">
                            <li class="sidebar-subnav-header">Dashboard</li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/new-ticket');?>" title="My Ticket New">
                                    <span>My Ticket New</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/opened-ticket');?>" title="My Ticket Open">
                                    <span>My Ticket Open</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/solved-ticket');?>" title="Ticket Solved">
                                    <span>My Ticket Solved</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/closed-ticket');?>" title="Ticket Closed">
                                    <span>My Ticket Closed</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <?php
                        if($getdata['hasil'] == 0)
                        {
                            ?>
                            <li>
                                <a href="<?php echo base_url('app/survey')?>" title="Survey">
                                    <em class="material-icons">check-square-o</em>
                                    <span>Ikuti Survey</span>
                                </a>
                            </li>
                            <?php
                        }
                    ?>
                </ul>
                <!-- END sidebar nav-->
            </nav>
        </div>
        <!-- #END# Sidebar (left)-->
    </aside>