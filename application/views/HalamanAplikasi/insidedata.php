<?php
    error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_ticket');
    $CI->load->model('api_users');
    $CI->load->model('api_category');
    $idticket = $ticknum;

    $resulttic = $CI->api_ticket->searchTicket($idticket);
    $idstafahli = $resulttic['data'][0]->assign_to;
    $idadmin = $resulttic['data'][0]->open_by;
    $idcat = $resulttic['data'][0]->id_category;
    $lamfile = $resulttic['data'][0]->problem_file;

    $staf = $CI->api_users->findUser($idstafahli);
    $adm = $CI->api_users->findUser($idadmin);
    $cat = $CI->api_category->findCategory($idcat);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Using Bootstrap modal</title>

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

    <!-- Bootstrap Core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="modal-body">
        <div class="row">
            <atricle class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Pemegang Dokumen</label>
                    <input readonly="readonly" class="form-control" type="text" value="<?php echo $adm['data'][0]->user_first_name.' '.$adm['data'][0]->user_last_name;?>">
                </div>
            </atricle>
            <article class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Jabatan Sistem</label>
                    <input readonly="readonly" value="Admin Sistem" required class="form-control" type="text">
                </div>
            </article>
        </div>
        <div class="row">
            <atricle class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Title</label>
                    <input readonly="readonly" class="form-control" type="text" value="<?php echo $resulttic['data'][0]->problem_summary;?>">
                </div>
            </atricle>
            <article class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Lampiran File</label>
                    <?php
                        if($lamfile == null || empty($lamfile))
                        {
                            ?>
                            <input readonly="readonly" class="form-control" type="text" value="{Tidak Terdaftar}">
                            <?php
                        }
                        else
                        {
                            ?>
                            <a target="blank_page" href="<?php echo base_url('app/file/'.$resulttic['data'][0]->problem_id);?>"><em class="material-icons">cloud_download</em></a>                            
                            <?php
                        }
                    ?>
                </div>
            </article>
        </div>
        <div class="row">
            <atricle class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Penugasan Kepada Staff Ahli</label>
                    <input readonly="readonly" class="form-control" type="text" value="<?php echo $staf['data'][0]->user_first_name.' '.$staf['data'][0]->user_last_name;?>">
                </div>
            </atricle>
            <article class="col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label>Kategori</label>
                    <input readonly="readonly" required class="form-control" type="text" value="<?php echo $cat['data'][0]->category;?>">
                </div>
            </article>
        </div>
        <div class="form-group">
			<label for="name">Problem Detail</label>
			<textarea class="form-control" rows="3" readonly="readonly" required><?php echo $resulttic['data'][0]->problem_detail;?></textarea>
		</div>
        <div class="form-group">
			<label for="name">Solusi</label>
			<textarea class="form-control" rows="7" readonly="readonly" required>
                <?php
                    if($resulttic['data'][0]->conclusion == null || empty($resulttic['data'][0]->conclusion))
                    {
                        echo "{Tidak Terdaftar}";
                    }
                    else
                    {
                        echo $resulttic['data'][0]->conclusion;
                    }
                ?>
            </textarea>
		</div>

        <div class="body table-responsive">
                    <table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap dataTable" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <?php
                                $i = 1;
                                foreach($data as $isidata)
                                {
                                    ?>
                                    <tr>
                                        <td><?php echo $i++;?></td>
                                        <td><?php echo $isidata->tanggal_kegiatan;?></td>
                                        <td><?php echo $isidata->keterangan;?></td>
                                    </tr>
                                    <?php
                                }
                            ?>
                        </tbody>
                    </table>
        </div>
	</div>
    <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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