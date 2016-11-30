var docWidth = $("#graphic").width();

var margin = {top: 20, right: 24, bottom: 0, left: 220},
    width = docWidth - margin.left - margin.right,
    height = 400 + margin.top + margin.bottom,
    tickNumber = 5;

if (docWidth < 450){
  tickNumber = 1;
}

var y = d3.scale.ordinal()
    .rangeRoundBands([0, 420], 0.5);

var x = d3.scale.linear()
    .range([0,width-100]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(tickNumber, "%");

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
//     return d == "Ben Carson" ? '#ca0020' :
//            d == "Ted Cruz" ? '#ca0020' :
//            d == "John Kasich" ? '#ca0020' :
//            d == "Marco Rubio" ? '#ca0020' :
//            d == "Donald Trump" ? '#ca0020' :
//            d == "Hillary Clinton" ? '#0571b0' :
//            d == "Bernie Sanders" ? '#0571b0' :
//                        '#edf8b1' ;
//
// }


d3.tsv("data.tsv", function(error, data) {

  data.sort(function(a, b){ return d3.descending(a.rate, b.rate); })

  y.domain(data.map(function(d) { return d.Candidate; }));
  x.domain([0, 0.5]);

  svg.append("g")
      .attr("class", "x axis")
        .attr("transform", "translate(100,2)")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
          .selectAll("text")
      .attr("id", function(d) { return d; })
      .style("text-anchor", "start")
          .attr("transform", "translate( -" + (margin.left - 30) + ",0)");

  var bar = svg.selectAll(".bar")
    .data(data)
    .enter();

    bar.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.Candidate); })
      .attr("height", y.rangeBand())
      .attr("x", 100)
      // .attr("fill", function(d) { return getColor(d.Candidate);   })
      .attr("width", function(d) { return x(d.rate); });

    bar.append("text")
        .attr("class","dataNumber")
        .attr("x", "60")
        .attr("y", function(d) { return y(d.Candidate); })
        .attr("dy", "0.75em")
        .text(function(d) { return (d.rate * 100).toFixed(0) + "%"  });

    bar.append("text")
        .attr("class","rank")
        .attr("x", -margin.left)
        .attr("y", function(d) { return y(d.Candidate); })
        .attr("dy", "1em")
        .text(function(d) { return (data.indexOf(d) + 1) });

pymChild.sendHeight();

});

//
// function redrawChart(demographic) {
//       d3.tsv("data.tsv", function(error, data) {
//
//       data.sort(function(a, b){ return d3.descending(a[demographic], b[demographic]); })
//       y.domain(data.map(function(d) { return d.Candidate; }));
//
//       var svg = d3.select("body").transition().duration(500);
//
//       svg.select(".y.axis")
//           .call(yAxis)
//         .selectAll("text")
//         .style("text-anchor", "start")
//           .attr("transform", "translate( -" + (margin.left - 30) + ",0)");
//
//       svg.selectAll(".bar")
//           .attr("width", function(d) { return x( d[demographic] ); })
//           .attr("fill", function(d) { return getColor(d.Candidate);   })
//           .attr("y", function(d) { return y(d.Candidate); });
//
//       svg.selectAll(".dataNumber")
//           .attr("y", function(d) { return y(d.Candidate); })
//           .text(function(d) { return (d[demographic] * 100).toFixed(0) + "%"  });
//
//       pymChild.sendHeight();
//
//       });
// }
