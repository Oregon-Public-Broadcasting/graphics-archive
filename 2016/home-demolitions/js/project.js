/*

This is a template for making bar charts quickly and consistently.
Comment/uncomment sections to change the type of bar chart. By default,
it is set to horizontal bar chart.

*/

// Get the document height and width, set chart widths accordingly
var docWidth = $(document).width() - 10;
var docHeight = $(document).height() - 20;

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = docWidth - margin.left - margin.right,
    height = docHeight - margin.top - margin.bottom;


// Function to add commas to big numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/************** HORIZONTAL BAR CHART ******************************************/
// supports stacked bars, median line, and optional tooltip
/******************************************************************************/

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1);

var x = d3.scale.linear()
    .range([0,width]);

var color = d3.scale.ordinal()
        // Uses D3 Colorbrewer, change the colors as needed
        .range(colorbrewer.YlGn[9]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(5); // add '$' for currency or '%' for percentage

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {

  var columnHeaders = d3.entries(data[0]);
  var valueKey = columnHeaders[0].key;
  var value = columnHeaders[1].key;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== valueKey; }));

  data.forEach(function(d) {
      var y0 = 0;
      d.Category = d[valueKey];
      d.barstacks = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.barstacks[d.barstacks.length - 1].y1;
    });

  // sorts data so tallest bars are on top, comment the following line to remove sorting
  data.sort(function(a, b) { return b.total - a.total; });

  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
          .selectAll("text")
          .style("text-anchor", "start")
          // this will likely need adjustment based on length of names
          .attr("transform", "translate(-15,0)");

      var category = svg.selectAll(".category")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0, " + y(d.Category) + ")"; });

        category.selectAll("rect")
            .data(function(d) { return d.barstacks; })
            .enter().append("rect")
            .attr("height", y.rangeBand())
            .attr("x", function(d) { return x(d.y0) ; })
            .attr("width", function(d) { return x(d.y1) - x(d.y0) ; })
            .style("fill", function(d) { return color(d.name); })
            .attr("class", "bar")
      /***** Tooltip ****/
      // Uncomment the following lines to enable
      // This comes from Data Visualization for the Web
            // .on("mouseover", function(d) {
            // //Get this bar's x/y values, then augment for the tooltip
            // var xPosition = parseFloat(d3.select(this).attr("x")) + y.rangeBand() + width/4;
            // var yPosition = parseFloat(d3.select(this).attr("y")) ;
            // //Update the tooltip position and value
            // d3.select("#tooltip")
            //   .style("left", width/2 + "px")
            //   .style("top", height/2 + "px")
            //   .select("#key")
            //   .text(d.Category);
            // d3.select("#value")
            //   .text(numberWithCommas(d.y1 - d.y0))
            // d3.select("#tooltip").classed("hidden", false);
            // })
            // .on("mouseout", function() {
            // d3.select("#tooltip").classed("hidden", true);
            // })
    /*** END TOOLTIP ***/

    /*** AVERAGE LINE ***/
    //Uncomment the following line to enable
    // var averageLine = Math.round(x(mean));
    // svg.append("line")
    //     .attr("class", "line")
    //     .attr("x1", averageLine)
    //     .attr("y1","0")
    //     .attr("x2", averageLine)
    //     .attr("y2", height -10 );
    // svg.append("text")
    //     .attr("class","average")
    //     .attr("x", averageLine * 2)
    //     .attr("y", height - 20)
    //     .html("Average: " + numberWithCommas(Math.round(mean)));

    /*** BAR LABELS ***/
    //This doesn't work yet
    // category.append("text")
    //     .attr("class","data")
    //     .attr("x", function(d) { return x(d.y1) + 6; })
    //     .attr("y", function(d) { return y(d.Category) + 10; })
    //     .attr("dy", ".35em")
    //     .text(function(d) { return (Math.round(d.y1)) });

});
