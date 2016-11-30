var docWidth = $(document).width();

if(docWidth < 500){
  var docHeight = 400
  ticks = 4
}
else{
var docHeight = 500
ticks = 6
}

var margin = {top: 50, right: 50, bottom: 30, left: 40},
    width = docWidth - margin.left - margin.right,
    height = docHeight - margin.top - margin.bottom;

// scale for x axis
var x = d3.scale.linear()
    .range([0, width]);

// scale for y axis
var y = d3.scale.linear()
    .range([height, 0]);

// scale for circle radius
var r = d3.scale.sqrt()
  // You'll want to set this based on what's right for your data
  .range([5, 5]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d) { return d + "%"; })
    .ticks(ticks);


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return d + "%"; })
    .ticks(ticks);


var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
    .attr("class", "scatterplot-tooltip")
    .style("opacity", 0);

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.poverty = +d.poverty;
    d.math = +d.math;
    /*** OPTIONAL THIRD VARIABLE ***/
    // d.variable3 = +d.variable3;
  });

  // Sets domain of X Axis, usually independent variable
  x.domain(d3.extent(data, function(d) { return d.poverty; })).nice();

  // Sets domain of Y Axis, usually dependent variable
  y.domain(d3.extent(data, function(d) { return d.math; })).nice();

  /*** OPTIONAL BUBBLE RADIUS UNCOMMENT TO USE ***/
  // Sets domain of dot radius, if you want to size bubbles by a third variable
  //r.domain(d3.extent(data, function(d) { return d.variable3; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Eligible for free/reduced price lunch");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 2)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Students passing")

  svg.selectAll(".dot")
      .data(data)
    	.enter()
				.append("circle")
		      .attr("class", "dot")
		      .attr("cx", function(d) { return x(d.poverty); })
		      .attr("cy", function(d) { return y(d.math); })
		      .style("stroke", function(d) { return "#2199e8"; })
					.style("stroke-width", "1")
          .style("fill", function(d) { return "#2199e8"; })
          .attr("r", r(2))
          .on("mouseover", function(d) {
                    d3.select(this)
                      .style("fill-opacity", "1");
                    tooltip.transition()
                         .duration(200)
                         .style("opacity", .9);
                    tooltip.html("<b><span style='font-size: 12px;'>" + d.school + "</span></b><br/> Passing math: " + d.math + "%<br/> Passing English: " + d.english + "%<br/> Free/reduced lunch: " + d.poverty + "%")
                         .style("left", (d3.event.pageX ) + "px")
                         .style("top", (d3.event.pageY ) + "px");
                })
                .on("mouseout", function(d) {
                  d3.select(this)
                    .style("fill-opacity", ".25");
                    tooltip.transition()
                         .duration(500)
                         .style("opacity", 0);
                });

    $("#english").click(function(){
      $("#math").addClass( "secondary");
      $("#english").removeClass( "secondary");
      svg.selectAll(".dot")
        .data(data)
        .transition()
        .duration(1000)
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.poverty); })
        .attr("cy", function(d) { return y(d.english); })
    })
    $("#math").click(function(){
      $("#english").addClass( "secondary");
      $("#math").removeClass( "secondary");
      svg.selectAll(".dot")
        .data(data)
        .transition()
        .duration(1000)
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.poverty); })
        .attr("cy", function(d) { return y(d.math); })
    })

});
