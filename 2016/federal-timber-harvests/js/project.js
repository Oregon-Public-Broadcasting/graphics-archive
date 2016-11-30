var docWidth = $("#chart").width();

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = docWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseyear = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d.year); })
    .y0(height)
    .y1(function(d) { return y(d.harvest); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.year = parseyear(d.year);
    d.harvest = +d.harvest;
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.harvest; })]);

  svg.selectAll("line.horizontalGrid").data(y.ticks(6)).enter()
    .append("line")
        .attr(
        {
            "class":"horizontalGrid",
            "x1" : 0,
            "x2" : width,
            "y1" : function(d){ return y(d);},
            "y2" : function(d){ return y(d);},
            "fill" : "none",
            "shape-rendering" : "crispEdges",
            "stroke" : "#ccc",
            "stroke-width" : "1px",
            "stroke-opacity": "0.5"
        });

  svg.append("path")
      .datum(data)
      .filter(function(d){ return d.year = 2000; })
      .attr("class", "area")
      .attr("d", area)

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 3)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Board feet");
});
