/*******************************************
            DEFAULT MAP OPTIONS
Changing this one line will give you
the desired topojson and correct projection
*******************************************/
var showing =
"Oregon"
// "US"
// "OregonWashington"
/*******************************************/

var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .5
  , height = width * mapRatio

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

if(showing == "Oregon"){
  scale = width * 5
  var projection = d3.geo.albers()
      .rotate([120, 0])
      .center([-0.7, 44.2])
      .scale(scale)
      .translate([width /2, height/2]);

  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/or.json"

}
else if(showing == "US") {

  var projection = d3.geo.albersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);


  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/us.json"

}
else if (showing == "OregonWashington"){
  scale = width * 3
  var projection = d3.geo.albers()
      .rotate([120, 0])
      .center([-0.7, 44.2])
      .scale(scale)
      .translate([width /2, height/1.25]);

  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/or_wa.json"

}

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)

queue()
    .defer(d3.json, geography) // Pick one of the geography files above
    .defer(d3.tsv, "data.tsv", function(d) { rateById.set(d.id, +d.value); })
    .await(ready);

function ready(error, geography) {
  if (error) throw error;

  var states = svg.selectAll('path.state')
      .data(topojson.feature(geography, geography.objects.counties).features) // change "counties" to desired boundary, if needed
      .enter()
       .append("path")
       .attr('class', 'state')
       .attr("class", function(d) {
         // if/else
         if(showing == "US"){
           return "state " + quantize(rateById.get(d.id)) + " ";
         }
         else {
           return "state " + quantize(rateById.get(d.properties.id)) + " ";
         }
       })
       .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(geography, geography.objects.counties, function(a, b) { return a !== b; })) // change "counties" to desired boundary, if needed
      .attr("class", "borders")
      .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");


///

d3.select(window).on('resize', resize);
function resize() {
    width = parseInt(d3.select('#map').style('width'));
    width = width - margin.left - margin.right;
    height = width * mapRatio;

    if(showing == "Oregon"){
      scale = width * 5
      translate = [width / 2, height / 2]

    }
    else if(showing == "US"){
      scale = width
      translate = [width / 2, height / 2]

    }
    else if(showing == "OregonWashington") {
      scale = width * 3
      translate = [width / 2, height / 1.5]
    }
    else{

    }

    // update projection
    projection
      .scale(scale)
      .translate(translate);

    // resize the map container
    svg
    .attr("width", width)
    .attr("height", height);

    // resize the map
    // svg.select('.land').attr('d', path);
    svg.selectAll('.state').attr('d', path);
    svg.selectAll('.borders').attr('d', path);
}
