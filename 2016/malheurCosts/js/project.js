var docWidth = $("#graphic").width()-20;

var margin = {top: 40, right: 24, bottom: 0, left: 20},
    width = docWidth - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom,
    tickNumber = 5;

if (docWidth < 450){
  tickNumber = 1;
}

var y = d3.scale.ordinal()
    .rangeRoundBands([0,height]);

var x = d3.scale.linear()
    .range([0,width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(tickNumber, "$");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#graphic").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("id", "container")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// function getColor(d) {
//     return d >= 0.90 ? '#081d58' :
//            d >= 0.85 ? '#253494' :
//            d >= 0.80 ? '#225ea8' :
//            d >= 0.70 ? '#1d91c0' :
//            d >= 0.60 ? '#41b6c4' :
//            d >= 0.50 ? '#7fcdbb' :
//            d >= 0.40 ? '#c7e9b4' :
//                        '#edf8b1' ;
// }


d3.tsv("data.tsv", function(error, data) {

  data.sort(function(a, b){ return d3.descending(a.TotalAmountRequested, b.TotalAmountRequested); })

  y.domain(data.map(function(d) { return d.AgencyName; }));
  x.domain([0, d3.max(data, function(d) { return d.TotalAmountRequested; })]);


  svg.append("g")
      .attr("class", "x axis")
        // .attr("transform", "translate(0,12)")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
          .selectAll("text")
      .attr("id", function(d) { return d; })
      .style("text-anchor", "start");

    d3.select('#oregon')
        .attr("font-weight", "bold");

  var bar = svg.selectAll(".bar")
    .data(data)
    .enter();

    bar.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.AgencyName); })
      .attr("height", y.rangeBand())
      .attr("x", 0)
      .attr("fill", 'blue')
      .attr("width", function(d) { return x(d.TotalAmountRequested); })
      // .attr("opacity", function(d) { if (d.State == "Oregon"){ return 1}else {return 0.7} })
      ;

    bar.append("text")
        .attr("class","dataNumber")
        .attr("x", "0")
        .attr("y", function(d) { return y(d.AgencyName); })
        .attr("dy", "0.75em")
        // .attr("font-weight", function(d) { if (d.State == "Oregon"){ return "bold"} })
        // .attr("fill", function(d) { if (d.State == "Oregon"){ return "red"} else {return "red"} })
        .text(function(d) { return (d.TotalAmountRequested)  });

    // bar.append("text")
    //     .attr("class","rank")
    //     .attr("x", -margin.left)
    //     .attr("y", function(d) { return y(d.AgencyName); })
    //     .attr("dy", "0.75em")
    //     .text(function(d) { return (data.indexOf(d) + 1) });


});


function redrawChart(demographic) {
      d3.tsv("data.tsv", function(error, data) {

      data.sort(function(a, b){ return d3.descending(a[demographic], b[demographic]); })
      y.domain(data.map(function(d) { return d.AgencyName; }));

      var svg = d3.select("body").transition().duration(500);

      svg.select(".y.axis")
          .call(yAxis)
        .selectAll("text")
        .style("text-anchor", "start")
          .attr("transform", "translate( -" + (margin.left - 50) + ",0)");

      svg.selectAll(".bar")
          .attr("width", function(d) { return x( d[demographic] ); })
          .attr("fill", function(d) { return getColor(d[demographic]);   })
          .attr("y", function(d) { return y(d.AgencyName); });

      svg.selectAll(".dataNumber")
          .attr("y", function(d) { return y(d.AgencyName); })
          .text(function(d) { return (d[demographic] * 100).toFixed(1) + "%"  });

      });
}
