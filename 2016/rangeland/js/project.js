var margin = {top: 20, right: 10, bottom: 30, left: 60},
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1);

var x = d3.scale.linear()
    .rangeRound([0, width]);

var color = d3.scale.ordinal()
    .range(["#B5CF6B", "#fc8d59", "#ccc"]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#upland-watershed").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  var columnHeaders = d3.entries(data[0]);
  var valueKey = columnHeaders[0].key;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.Category = d[valueKey];
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total - a.total; });

  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  var state = svg.selectAll(".state")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(0," + y(d.Category) + ")"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .attr("height", y.rangeBand())
      .attr("x", function(d) { return x(d.y0); })
      .attr("width", function(d) { return x(d.y1) - x(d.y0); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});
