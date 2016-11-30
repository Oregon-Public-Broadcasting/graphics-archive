var docWidth = $("#chart").width();
var docHeight = 450// docWidth * .35

var margin = {top: 30, right: 30, bottom: 30, left: 60},
    width = docWidth - margin.left - margin.right,
    height = docHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var r = d3.scale.sqrt()
    // .domain([0, 1e6])
    .range([2, 25]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks("4");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks("4");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Reference:
// http://stackoverflow.com/questions/20780835/putting-the-country-on-drop-down-list-using-d3-via-csv-file

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.incidents = +d.derailments;
    d.miles = +d.miles;
		d.cost = +d.derailments_cost;
  });
  x.domain(d3.extent(data, function(d) { return d.miles; })).nice();
  y.domain(d3.extent(data, function(d) { return d.incidents; })).nice();
	r.domain(d3.extent(data, function(d) { return d.cost; })).nice();

  // GRIDLINES
  svg.selectAll("line.horizontalGrid").data(y.ticks(4)).enter()
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
            "stroke" : "black",
            "stroke-width" : "1px"
        });
  svg.selectAll("line.verticalGrid").data(x.ticks(4)).enter()
    .append("line")
        .attr(
        {
            "class":"horizontalGrid",
            "y1" : 0,
            "y2" : height - 4,
            "x1" : function(d){ return x(d);},
            "x2" : function(d){ return x(d);},
            "fill" : "none",
            "shape-rendering" : "crispEdges",
            "stroke" : "#eee",
            "stroke-width" : "1px"
        });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width - 6)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Total train miles (in millions)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Incidents")

  var tooltip = d3.select("body").append("div")
      .attr("class", "scatterplot-tooltip")
      .style("opacity", 0);

  svg.selectAll(".dot")
      .data(data)
    	.enter()
				.append("circle")
		      .attr("class", "dot")
		      .attr("r", function(d) { return r(d.derailments_cost); })
		      .attr("cx", function(d) { return x(d.miles); })
		      .attr("cy", function(d) { return y(d.derailments); })
		      .style("stroke", function(d) { return color(d.color); })
					.style("stroke-width", "1")
          .style("fill", function(d) { return color(d.color); })
          .style("fill-opacity", "0.2")
          .on("mouseover", function(d) {

                    d3.select(this)
                      .style("fill-opacity", ".5");

                    tooltip.transition()
                         .duration(200)
                         .style("opacity", .9);
                    tooltip.html("<b>" + d.railroad + "</b>" + "<br/>" + numberWithCommas(d.derailments) + " incidents <br/> " + numberWithCommas(d.miles) +" train miles <br/> Total cost: $" + numberWithCommas(d.derailments_cost) + "")
                         .style("left", (d3.event.pageX - 25) + "px")
                         .style("top", (d3.event.pageY - 25) + "px");
                })
                .on("mouseout", function(d) {
                  d3.selectAll(".dot")
                    .style("fill-opacity", ".2");
                    tooltip.transition()
                         .duration(500)
                         .style("opacity", 0);
                });

  d3.select("#showFires")
    .on("click", function(d){

      data.forEach(function(d) {
        d.incidents = +d.fires;
        d.miles = +d.miles;
        d.cost = +d.fires_cost;
      });
      x.domain(d3.extent(data, function(d) { return d.miles; })).nice();
      y.domain(d3.extent(data, function(d) { return d.incidents; })).nice();
      r.domain(d3.extent(data, function(d) { return d.cost; })).nice();

      svg.selectAll(".x.axis")
         .transition()
         .duration(1000)
         .call(xAxis);

      // Update Y Axis
      svg.selectAll(".y.axis")
         .transition()
         .duration(1000)
         .call(yAxis);
      //
      svg.selectAll(".dot")
              .transition()
              .duration(1000)
              .attr("cx", function(d) { return x(d.miles); })
              .attr("cy", function(d) { return y(d.fires); })
              .attr("r", function(d) { return r(d.fires_cost); })
              .style("stroke", function(d) { return color(d.color); })
              .style("stroke-width", "1")
              .style("fill", function(d) { return color(d.color); })
              .style("fill-opacity", "0.2")
              .on("mouseover", function(d) {
                        d3.select(this)
                          .style("fill-opacity", ".5");

                        tooltip.transition()
                             .duration(200)
                             .style("opacity", .9);
                        tooltip.html("<b>" + d.railroad + "</b>" + "<br/>" + numberWithCommas(d.fires) + " incidents <br/> " + numberWithCommas(d.miles) +" train miles <br/> Total cost: $" + numberWithCommas(d.fires_cost) + "")
                             .style("left", (d3.event.pageX - 25) + "px")
                             .style("top", (d3.event.pageY - 25) + "px");
                    })
                    .on("mouseout", function(d) {
                      d3.selectAll(".dot")
                        .style("fill-opacity", ".2");
                        tooltip.transition()
                             .duration(500)
                             .style("opacity", 0);
                    });
    })

    d3.select("#showDerailments")
      .on("click", function(d){


        data.forEach(function(d) {
          d.incidents = +d.derailments;
          d.miles = +d.miles;
      		d.cost = +d.derailments_cost;
        });
        x.domain(d3.extent(data, function(d) { return d.miles; })).nice();
        y.domain(d3.extent(data, function(d) { return d.incidents; })).nice();
      	r.domain(d3.extent(data, function(d) { return d.cost; })).nice();

        svg.selectAll(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        // Update Y Axis
        svg.selectAll(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);
        //
        svg.selectAll(".dot")
                .transition()
                .duration(1000)
                .attr("cx", function(d) { return x(d.miles); })
                .attr("cy", function(d) { return y(d.derailments); })
                .attr("r", function(d) { return r(d.derailments_cost); })
                .style("stroke", function(d) { return color(d.color); })
                .style("stroke-width", "1")
                .style("fill", function(d) { return color(d.color); })
                .style("fill-opacity", "0.2")
                .on("mouseover", function(d) {

                          d3.select(this)
                            .style("fill-opacity", ".5");

                          tooltip.transition()
                               .duration(200)
                               .style("opacity", .9);
                          tooltip.html("<b>" + d.railroad + "</b>" + "<br/>" + numberWithCommas(d.derailments) + " incidents <br/> " + numberWithCommas(d.miles) +" train miles <br/> Total cost: $" + numberWithCommas(d.derailments_cost) + "")
                               .style("left", (d3.event.pageX - 25) + "px")
                               .style("top", (d3.event.pageY - 25) + "px");
                      })
                      .on("mouseout", function(d) {
                        d3.selectAll(".dot")
                          .style("fill-opacity", ".2");
                          tooltip.transition()
                               .duration(500)
                               .style("opacity", 0);
                      });



      })



  //
	// svg.selectAll("svg")
  //     .data(data)
  //   	.enter()
  //         .append("text")
	// 				.attr("class", "bubble-label")
	// 	      .attr("x", function(d) { return x(d.miles); })
	// 	      .attr("y", function(d) { return y(d.fires); })
  //         .attr("transform", "translate(-95, 15)")
  //         // .attr("transform", function(d){
	// 				// 	if(d.railroad=="CSX") { return "translate(15," + (0) + ")"}
	// 				// 	else if(d.railroad=="Canadian National"){ return "transform", "translate(5," + (-5) + ")"}
	// 				// 	else if(d.railroad=="Union Pacific"){ return "transform", "translate(-95," + (15) + ")"}
	// 				// 	else { return "transform", "translate(5," + (-10) + ")"}
	// 				// })
	// 				.text(function(d){ if(d.railroad == "Union Pacific"){ return "Union Pacific travels a lot of miles, but its rate of fires and violent ruptures is nearly double that of other large railroads. It's also had by far the costliest of these incidents." ; } });

    // var legend = svg.append("g")
    //     .attr("class", "legend")
    //     .attr("transform", "translate(" + (60) + "," + (85) + ")")
    //   .selectAll("g")
    //     .data(data)
    //     .enter().append("g")
    //     ;
    //
    //     svg.append("g")
    //         .attr("class", "bubble-legend")
    //         .attr("transform", "translate(" + (60) + "," + (30) + ")")
    //         .append("text")
    //         .text("Incident costs")
    //
    // legend.append("circle")
    //     .attr("cy", function(d) { return -r(d.cost); })
    //     .attr("r", function(d) { return r(d.cost)});
    //
    // legend.append("text")
    //     .attr("y", function(d) { return -2 * r(d.cost); })
    //     .attr("dy", "2em")
    //     .attr("class", "bubble-legend")
    //     .style("fill", "#999")
    //     .text(function(d) { if(d.railroad=="Union Pacific") { return ">$10m"} }); //hard coded, should not be


});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
