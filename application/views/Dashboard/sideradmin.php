<!-- sidebar-->
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
                                <a href="<?php echo base_url('app/ticket/new-ticket');?>" title="Ticket New">
                                    <span>Ticket New</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/opened-ticket');?>" title="Ticket Open">
                                    <span>Ticket Open</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/solved-ticket');?>" title="Ticket Solved">
                                    <span>Ticket Solved</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/ticket/closed-ticket');?>" title="Ticket Closed">
                                    <span>Ticket Closed</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#masterdata" title="Master Data" data-toggle="collapse" class="menu-toggle">
                            <em class="material-icons">dns</em>
                            <span>Master Data</span>
                        </a>
                        <ul id="masterdata" class="nav sidebar-subnav collapse">
                            <li class="sidebar-subnav-header">Master Data</li>
                            <li>
                                <a href="<?php echo base_url('app/getCategory');?>" title="Kategori">
                                    <span>Kategori</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/getReward');?>" title="Reward">
                                    <span>Reward</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo base_url('app/getPrio');?>" title="Prioritas">
                                    <span>Prioritas</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="<?php echo base_url('app/getUser');?>" title="Users">
                            <em class="material-icons">supervisor_account</em>
                            <span>Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo base_url('app/setting');?>" title="Setting">
                            <em class="material-icons">settings</em>
                            <span>Setting</span>
                        </a>
                    </li>
                </ul>
                <!-- END sidebar nav-->
            </nav>
        </div>
        <!-- #END# Sidebar (left)-->
    </aside>