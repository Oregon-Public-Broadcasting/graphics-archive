var docWidth = $("#chart").width();

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = docWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseyear = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

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

  depression = data.filter(function(d){ return d.year <= 1932; })
  boom = data.filter(function(d){ return d.year >= 1932 & d.year <= 1989; })
  bust = data.filter(function(d){ return d.year >= 1989; })


  data.forEach(function(d) {
    d.year = parseyear(d.year);
    d.harvest = +d.harvest;
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.harvest; })]);

  svg.selectAll("line.horizontalGrid").data(y.ticks(10)).enter()
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
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("class", "y-label")
      .style("text-anchor", "end")
      .text(" ");

      var highlight = d3.svg.area()
          .x(function(d) { return x(d.year); })
          .y0(height)
          .y1(function(d) { return y(d.harvest); });
          // .x(function(d) {
          //   return x(d.year); })
          // .y(function(d) { return y(d.harvest); });

          // var depressionLine = svg.append("path")
          //     .datum(depression)
          //     .attr("class", "red-line")
          //     .attr("id", "line-1")
          //     .attr("d", highlight);
          //
          //
          // var boomLine = svg.append("path")
          //     .datum(boom)
          //     .attr("class", "red-line")
          //     .attr("id", "line-2")
          //     .attr("d", highlight);
          //
          //     var bustLine = svg.append("path")
          //         .datum(bust)
          //         .attr("class", "red-line")
          //         .attr("id", "line-3")
          //         .attr("d", highlight);


        // counter = 1
        // function stepper(){
        //
        // };

        // $("#line-2").hide();
        // $("#line-3").hide();
        // counter = 0
        // window.setInterval(function(){
        //   switch(counter) {
        //     case 0:
        //       console.log("Case 1")
        //       // $("#line-2").hide();
        //       // $("#line-3").hide();
        //       $("#line-2").show();
        //       $("#line-1").fadeOut(400);
        //       // window.setInterval(stepper(), 1000);
        //     break;
        //
        //     case 1:
        //     console.log("Case 2")
        //     $("#line-3").show();
        //     $("#line-2").fadeOut(400);
        //       // $("#line-2").fadeIn(400);
        //     break;
        //
        //     case 2:
        //     console.log("Case 3")
        //     $("#line-1").show();
        //     $("#line-3").fadeOut(400);
        //     break;
        //   }
        //   if(counter == 2){
        //     counter = 0
        //   }
        //   else{
        //     counter = counter + 1
        //   }
        // }, 3300);
        //


});

// $(document).ready(function(){
//
//   var divs = $('[id^="chatter-"]').hide(),
//       i = 0;
//
//   (function cycle() {
//
//       divs.eq(i).fadeIn(400)
//                 .delay(2500)
//                 .fadeOut(400, cycle);
//
//       i = ++i % divs.length;
//
//   })();
//
// });
