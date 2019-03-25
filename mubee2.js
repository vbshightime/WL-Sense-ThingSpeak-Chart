<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8" />
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['corechart','gauge','line','imagelinechart']}]}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<div id="htchart"></div>
<script>
google.charts.load('current', {'packages':['line','controls', 'corechart']});
google.charts.setOnLoadCallback(draw);
var data, chart;
var channel_id = 728991;
var api_key = 'PV8TTYNRTZB1X9SB';
//var cnt = 0;
//var points = 14;
//var got = 0;
var opt = {
    hAxis: {
        title:'Time'
    },
    vAxis: {
        title:'Vibration'
    }
};    
function draw(){
    data = new google.visualization.DataTable();
    chart = new google.visualization.LineChart(document.getElementById('htchart'));
    data.addColumn('string','Time');
    data.addColumn('number','RMSX');
    data.addColumn('number','RMSY');
    data.addRows([
        [' ', 0, 0]  
    ]);
    chart.draw(data, opt);
}

function update() {
  //  if(got == 0){
    //    got = 1;
        $.get('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(field,s){
      //      cnt ++
            var cur = new Date();
			var rmsx = parseInt(field.field1);
			var rmsy = parseInt(field.field2);
            data.addRows([[cur.getMinutes() + ":" + cur.getSeconds(), rmsx, rmsy]]);
        //    if(cnt == points){
          //      for (i = 0; i < points/2; i++) {
            //        data.removeRow(i);
              //  }
               // cnt = i;
           // }
            //got = 0;
            chart.draw(data, opt);
     });
    }//else{
        //got ++;
        //if(got == points/3){
        //   got = 0;        
      //  }
    //}  
setInterval(update, 6000);
</script>
</body>
</html>

