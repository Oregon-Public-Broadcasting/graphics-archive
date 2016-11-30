var docWidth = $(document).width() - 10;
var docHeight = $(document).height() - 20;

var margin = {top: 50, right: 55, bottom: 0, left: 190},
    width = docWidth - margin.left - margin.right,
    height = docHeight - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1);

var x = d3.scale.linear()
    .range([0,width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(5, "%");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  y.domain(data.map(function(d) { return d.facility; }));
  x.domain([0, d3.max(data, function(d) { return d.delayed31daysRate; })]);

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
          .selectAll("text")
      .style("text-anchor", "start")
          .attr("transform", "translate(-180,0)");

  var bar = svg.selectAll(".bar").data(data).enter();

    bar.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.facility); })
      .attr("height", y.rangeBand())
      .attr("x", 0)
      .attr("width", function(d) { return x(d.delayed31daysRate); });

  var averageLine = Math.round(x(0.0278));

  svg.append("line")
      .attr("class", "line")
      .attr("x1", averageLine)
      .attr("y1","-26")
      .attr("x2", averageLine)
      .attr("y2", height / 2.42 );

  svg.append("text")
    .attr("class","average")
    .attr("x", averageLine + 6)
    .attr("y", -34)
    .html("2.78% U.S. Average");

    bar.append("text")
        .attr("class","data")
        .attr("x", function(d) { return x(d.delayed31daysRate) + 6; })
        .attr("y", function(d) { return y(d.facility) + 10; })
        .attr("dy", ".35em")
        .text(function(d) { return (Math.round(d.delayed31daysRate * 10000)/ 100) + "%"  });

});

function type(d) {
  d.delayed31daysRate = +d.delayed31daysRate;
  return d;
}
