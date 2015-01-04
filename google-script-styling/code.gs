var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var charts = sheet.getCharts();
var textStyle = Charts.newTextStyle().setColor("ccc").setFontSize(10).setFontName('Arial').build();
// Color range sequence: 1) Politics 2) Business 3) Private
//var colorRange = ["#93ce6d","#37abc8","#dc7f7f"];
var colorRangeMedium = ["#668F4C","#206273","#9C5A5A"]; 
var colorRangeDark = ["#456133","#194C59","#633939"]; 

function styleGeneric() {

  for (var y = 0; y < charts.length; y++) {
    var chart = charts[y];
    var height = (charts.length > 1) ? 100 :240;
    chart = chart.modify()
    .setOption('width', 320) 
    .setOption('height', height) 
    .setPosition(3, 7, 0, 0 + y*150)
    .setOption('title', '') //.setOption('title', sheet.getRange("H1").getValue())
    .setOption('theme', 'maximized');    
    
    if (chart.getChartType() == "COLUMN") {
      styleColumnSpecifics(chart);
    }
    else if (chart.getChartType() == "AREA") {
      styleAreaSpecifics(chart);
    }
    else if (chart.getChartType() == "LINE") {
      if (charts.length > 1) {
        chart = chart.asLineChart()
        .setOption('vAxis.minValue', sheet.getRange("E2").getValue())
        .setOption('vAxis.maxValue', sheet.getRange("E3").getValue());
        if (y == charts.length-1) {
          chart = chart.asLineChart().setOption('hAxis.textPosition', 'in');
        } else {
           chart = chart.asLineChart().setOption('hAxis.textPosition', 'none');         
        };
      };
      chart = chart.asLineChart()
        .setCurveStyle(Charts.CurveStyle.SMOOTH)
        .setYAxisTitle("")
        .setXAxisTitle("")
        .setColors(["#ddd"])
        .setXAxisTextStyle(textStyle)
        .setYAxisTextStyle(textStyle)
        .setTitleTextStyle(textStyle)
        .setOption('legend', 'none')
        .setOption('lineWidth', 2)
        .setOption('backgroundColor', '#222')
        .setOption('hAxis.baselineColor', 'transparent')
        .setOption('vAxis.baselineColor', 'transparent')
        .setOption('vAxis.gridlines.color', 'transparent')
        .setOption('hAxis.gridlines.color', 'transparent')
        .setOption('vAxis.gridlines.count', 6)
        .build();
      sheet.updateChart(chart);
    }
    else if (chart.getChartType() == "BAR") {
      styleBarSpecifics(chart);
    }
    else {
      char.build();
      sheet.updateChart(chart);
    };
  }
};

function styleLineSpecifics(chart) { 

};

function styleAreaSpecifics(chart) {
  chart = chart
  .asAreaChart()
  .setYAxisTitle("")
  .setXAxisTitle("")
  .setBackgroundColor("#222")
  .setColors(colorRangeMedium)
  .setXAxisTextStyle(textStyle)
  .setYAxisTextStyle(textStyle)
  .setTitleTextStyle(textStyle)
  .setOption('legend', 'right')
  .setOption('lineWidth', 2)
  .setOption('vAxis.minValue', 0)
  .setOption('vAxis.gridlines.color', 'transparent')
  .setOption('hAxis.gridlines.color', 'transparent')
  .setOption('vAxis.gridlines.count', 6)
  .build();
  sheet.updateChart(chart);
};



function styleBarSpecifics(chart) {
  chart = chart
  .asBarChart()
  .setYAxisTitle("")
  .setXAxisTitle("")
  .setBackgroundColor("#222")
  .setColors(colorRangeDark)
  .setXAxisTextStyle(textStyle)
  .setYAxisTextStyle(textStyle)
  .setTitleTextStyle(textStyle)
  .setOption('legend', 'none')
  .setOption('vAxis.minValue', 0)
  .setOption('vAxis.gridlines.color', 'transparent')
  .setOption('hAxis.gridlines.color', 'transparent')
  .build();
  sheet.updateChart(chart);
};

function styleColumnSpecifics(chart) {
  chart = chart
  .asColumnChart()
  .setYAxisTitle("")
  .setXAxisTitle("")
  .setBackgroundColor("#222")
  .setColors(["#aaa"])
  .setXAxisTextStyle(textStyle)
  .setYAxisTextStyle(textStyle)
  .setTitleTextStyle(textStyle)
  .setOption('legend', 'none')
  .setOption('vAxis.minValue', 0)
  .setOption('vAxis.gridlines.color', 'transparent')
  .setOption('hAxis.gridlines.color', 'transparent')
  .build();
  sheet.updateChart(chart);
};
function onOpen() {   
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [{name: "Chart", functionName: "styleGeneric"}];
  ss.addMenu("Style Charts", menuEntries);  
}
