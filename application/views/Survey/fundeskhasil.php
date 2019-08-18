<?php
    error_reporting(E_ALL ^ E_NOTICE);
	$CI =& get_instance();
    $CI->load->model('api_survey');
    $result = $CI->api_survey->all();
?>

<div class="row">
    <div class="col-md-12">
        <div class="widget_card_two alert">
            <div class="widget_card_header">
                <center><h3>Hasil Kuesioner</h3></center>
            </div>

            <div class="widget_card_body collapse out" id="invoice_statement">
                <div class="table-responsive">
                    <table id="myTable" border="3" bordercolor="#48afa3" class="table table-condensed table-hover table-striped">
                        <thead>
                            <tr>
                                <th rowspan="2"style="vertical-align : middle;text-align:center;">No</th>
                                <th class="text-center" width="40%" rowspan="2" style="vertical-align : middle;text-align:center;">Indikator</th>
                                <th colspan="4" class="text-center" style="vertical-align : middle;text-align:center;">Frekuensi Kepuasan</th>
                                <th rowspan="2" class="text-center" style="vertical-align : middle;text-align:center;">Nilai IKM</th>
                                <th rowspan="2" class="text-center" style="vertical-align : middle;text-align:center;">Konversi IKM</th>
                                <th rowspan="2" class="text-center" style="vertical-align : middle;text-align:center;">Mutu Layanan</th>
                                <th rowspan="2" class="text-center" style="vertical-align : middle;text-align:center;">Kinerja Unit</th>
                            </tr>
                            <tr>
                                <th width="5%" class="text-center" style="vertical-align : middle;text-align:center;">STP</th>
                                <th width="5%" class="text-center" style="vertical-align : middle;text-align:center;">TP</th>
                                <th width="5%" class="text-center" style="vertical-align : middle;text-align:center;">P</th>
                                <th width="5%" class="text-center" style="vertical-align : middle;text-align:center;">SP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $i = 1;
                            $jumlahpertanyaan = 0;
							$footerikm = 0;
							$footerstp = 0;
							$footertp = 0;
							$footerp = 0;
                            $footersp = 0;
                            
                            $resultresponden = $this->api_survey->dataresponden();
                            $datajumlahresponden = $resultresponden['hasil'];

                            foreach($result['data'] as $isidata)
                            {
                                $jumlahpertanyaan++;
                                $stp = 0;
                                $tp = 0;
                                $p = 0;
                                $sp = 0;

                                $resultisi = $this->api_survey->isique($isidata->uraian);
                                foreach($resultisi['data'] as $isidataisi)
                                {
                                    if($isidataisi->kepuasaan == 1)
                                    {
                                        $stp++;
                                    }
                                    else if($isidataisi->kepuasaan == 2)
                                    {
                                        $tp++;
                                    }
                                    else if($isidataisi->kepuasaan == 3)
                                    {
                                        $p++;
                                    }
                                    else if($isidataisi->kepuasaan == 4)
                                    {
                                        $sp++;
                                    }
                                }
                                $skorstp = $stp * 1;
                                $skortp = $tp * 2;
                                $skorp = $p * 3;
                                $skorsp = $sp * 4;
                                $totalskor = $skorstp + $skortp + $skorp + $skorsp;
                                $nilaiikm = $totalskor / $datajumlahresponden;
                                $konversiikm = $nilaiikm * 25;
                                
                                $footerikm += $nilaiikm;
                                $footerstp += $stp;
                                $footertp += $tp;
                                $footerp += $p;
                                $footersp += $sp;

                                $nilai = $this->api_survey->konversi($konversiikm);
                                ?>
                                    <tr>
                                        <td><?php echo $i;?></td>
                                        <td><?php echo $isidata->uraian;?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $stp;?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $tp;?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $p;?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $sp;?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo round($nilaiikm, 3);?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo round($konversiikm, 3);?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $nilai['mutu'];?></td>
                                        <td class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $nilai['kinerja'];?></td>
									</tr>
                                <?php
                                $i++;
                            }
                            $footerikm = $footerikm / $jumlahpertanyaan;
                            $footerkonversiikm = $footerikm * 25;
                            $footernilai = $this->api_survey->konversi($footerkonversiikm);
                            ?>
                                <tr class="success">
                                    <th class="text-center" colspan="2" style="vertical-align : middle;text-align:center;">Jumlah (Frekuensi Kepuasan)</th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footerstp;?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footertp;?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footerp;?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footersp;?></th>
                                    <th class="warning text-center" colspan="4"></th>
								</tr>
								<tr class="success">
                                    <th class="text-center" colspan="6" style="vertical-align : middle;text-align:center;">Mutu Layanan</th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo round($footerikm, 3);?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo round($footerkonversiikm, 3);?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footernilai['mutu'];?></th>
                                    <th class="text-center" style="vertical-align : middle;text-align:center;"><?php echo $footernilai['kinerja'];?></th>
								</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>