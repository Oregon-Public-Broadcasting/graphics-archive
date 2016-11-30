var projectiondate = new Date(2015, 12, 01);

var docWidth = $(document).width() - 10;
var docHeight = $(document).height() - 20;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = docWidth - margin.left - margin.right,
    height = width/2 - margin.top - margin.bottom;

var parseDate = d3.time.format("%m/%d/%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(4);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.coal); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var regions = color.domain().map(function(name, date) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, coal: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(regions, function(c) { return d3.min(c.values, function(v) { return v.coal - (v.coal/9); }); }),
    d3.max(regions, function(c) { return d3.max(c.values, function(v) { return v.coal + (v.coal/9); }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Million short tons");

  var coal = svg.selectAll(".coal")
      .data(regions)
    .enter().append("g")
      .attr("class", "coal");

  coal.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); })

      svg.append("line")
          .attr("class", "projectionline")
          .attr("x1", x(projectiondate))
          .attr("y1","0")
          .attr("x2", x(projectiondate))
          .attr("y2", height -10 );
      svg.append("text")
          .attr("class","projectiontext")
          .attr("x", x(projectiondate) + 10)
          .attr("y", height/2)
          .html("Projected ➡");

  // coal.append("text")
  //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.coal) + ")"; })
  //     .attr("x", 3)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.name; });
});
