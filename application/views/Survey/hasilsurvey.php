<div class="row">
    <div class="col-md-12">
        <div class="widget_card_two alert">
            <div class="widget_card_header">
                <center><h3>Hasil Kuesioner</h3></center>
                <center><h3>Helpdesk POST - TEST</h3></center>
            </div>

            <div class="widget_card_body collapse out" id="invoice_statement">
                <div class="table-responsive">
                    <table id="myTable" border="3" bordercolor="#48afa3" class="table table-condensed table-hover table-striped">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <script type='text/javascript'>
        function fetchdata(){
            $.ajax({
                url: '<?php echo base_url('app/datasurvey')?>',
                method: 'post',
                success: function(response){
                    $('#myTable').html(response);
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