
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("step-after")
    .defined(function(d) { return !isNaN(d.wage); })
    // .defined(function(d) { return d; })

    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.wage); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data2.tsv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

  data.forEach(function(d) {
    d.year = parseDate(d.year);
  });

  var plans = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          date: d.year,
          wage: +d[name]
        };
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));

  y.domain([7,17]);

  // y.domain([
  //   d3.min(plans, function(c) { return d3.min(c.values, function(v) { return v.wage; }); }),
  //   d3.max(plans, function(c) { return d3.max(c.values, function(v) { return v.wage; }); })
  // ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Wage");

  var plan = svg.selectAll(".plan")
      .data(plans)
    .enter().append("g")
      .attr("class", "plan");

  plan.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      // .style("stroke", function(d) { return color(d.year); })
      ;


      svg.selectAll(".dot")
          .data(plan.filter(function(d) { return d; }))
        .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", line.x())
          .attr("cy", line.y())
          .attr("r", 3.5);

// svg.append("g")
//   .attr("class", "plan").append("line")
//   .attr("x1", x(parseDate(2016)) )
//   .attr("y1", y(9.25) )
//   .attr("x2", x(parseDate(2016)) )
//   .attr("y2", y(9.25) )
//   .style("stroke","rgb(255,0,0)" );

  // plan.append("text")
  //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
  //     .attr("x", 3)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.name; });
});
