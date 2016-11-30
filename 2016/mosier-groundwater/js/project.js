/*

This is a template for making bar charts quickly and consistently.
Comment/uncomment sections to change the type of bar chart. By default,
it is set to horizontal bar chart.

*/

// Get the document height and width, set chart widths accordingly
// Function to add commas to big numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/************** HORIZONTAL BAR CHART ******************************************/
// supports stacked bars, median line, and optional tooltip
/******************************************************************************/

d3.tsv("data.tsv", function(error, data) {

  var columnHeaders = d3.entries(data[0]);
  var valueKey = columnHeaders[0].key;
  var value = columnHeaders[1].key;

  hydrocarbons_div = "#hydrocarbons"
  volatiles_div = "#volatiles"
  semivolatiles_div = "#semivolatiles"

  hydrocarbons = data.filter(function(d) { return d.category == "Petroleum hydrocarbons" })
  hydrocarbons = hydrocarbons.sort(function(d) { return -d.concentration; });

  volatiles = data.filter(function(d) { return d.category == "Volatile Organic Compounds" })
  volatiles = volatiles.sort(function(d) { return -d.concentration; });

  semivolatiles = data.filter(function(d) { return d.category == "Semi-Volatile Organic Compounds" })
  semivolatiles = semivolatiles.sort(function(d) { return -d.concentration; });

  // color.domain(d3.keys(data[0]).filter(function(key) { return key !== valueKey; }));

  drawchart(hydrocarbons_div, hydrocarbons)
  drawchart(volatiles_div, volatiles)
  drawchart(semivolatiles_div, semivolatiles)

});

function drawchart (chart, data){

  var docWidth = $(chart).width();
  var docHeight = $(chart).height() ;

  // if (docWidth > 500){
  //   var docHeight = docWidth / 3 //$(document).height() - 20;
  // }
  // else {
  //   var docHeight = docWidth  //$(document).height() - 20;
  // }

  var margin = {top: 20, right: 20, bottom: 40, left: 150},
      width = docWidth - margin.left - margin.right,
      height = docHeight - margin.top - margin.bottom;


  if(width>500){
    axis_label =   "Parts per billion"
  }
  else{
    axis_label = "ug/L"
  }


  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .1);

  var x = d3.scale.linear()
      .range([0, width]);

  var color = d3.scale.ordinal()
          // Uses D3 Colorbrewer, change the colors as needed
          // .range(colorbrewer.YlGn[9]);
          // .range(['green', "red", "blue"])

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("top")
      .ticks(5)
; // add '$' for currency or '%' for percentage

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(0);

  var svg = d3.select(chart).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(data.map(function(d) { return d.analyte; }));
  x.domain([0, d3.max(data, function(d) { return +d.concentration; })]);

  data.sort(function(d) { return d.concentration; });
  // mean = d3.mean(data,function(d) { return d.total})
  // console.log(mean)

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
          .selectAll("text")
          .style("text-anchor", "start")
          // this will likely need adjustment based on length of names
          .attr("transform", "translate(-100,0)");

  var barheight = 30
  var category = svg.selectAll(".category")
          .data(data)
          .enter()
          .append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0, " + y(d.analyte) + ")"; })
              .append("rect")
                .attr("height", d3.min([y.rangeBand(), 30]))
                .attr("x", function(d) { return 0 ; })
                .attr("width", function(d) { return width; })
                .style("fill", "#eee")

  svg.selectAll(".category")
          .data(data)
          .enter()
          .append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0, " + y(d.analyte) + ")"; })
              .append("rect")
                .attr("height", d3.min([y.rangeBand(), 30]))
                .attr("x", function(d) { return 1 ; })
                .attr("width", function(d) { return x(d.concentration) ; })
                .style("fill", "#fc8d59")

    svg.selectAll(".category")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0, " + y(d.analyte) + ")"; })
                .append("rect")
                  .attr("height", d3.min([y.rangeBand(), 30]))
                  .attr("x", function(d) { return x(d.drinking) ; })
                  .attr("width", function(d) {
                    if(d.drinking > 0){
                      return 3
                    }
                    else{
                    }
                    return 0 ;
                  })
                  .style("fill", "#2c7bb6")
                  .style("stroke", "#fff")
                  .style("stroke-width", "1px")


    svg.selectAll(".category")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0, " + y(d.analyte) + ")"; })
                .append("rect")
                  .attr("height", d3.min([y.rangeBand(), 30]))
                  .attr("x", function(d) { return x(d.ecological) ; })
                  .attr("width", function(d) {
                    if(d.ecological > 0){
                      return 3
                    }
                    else{
                    }
                    return 0 ;
                  })
                    .style("fill", "#2ca25f")
                    .style("stroke", "#fff")
                    .style("stroke-width", "1px")

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width - 5)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(axis_label);
}
