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

var margin = {top: 30, left: 0, bottom: 0, right: 0}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .75
  , height = width * mapRatio + margin.top + margin.bottom;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

if(showing == "Oregon"){
  var scale = width * 9.5;
  var projection = d3.geo.albers()
      .rotate([120, 0])
      .center([-0.7, 44.2])
      .scale(scale)
      .translate([width /2, ((height + margin.top)/2)]);

  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/or.json"

}
else if(showing == "US") {

  var projection = d3.geo.albersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);


  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/us.json"

}
else if (showing == "OregonWashington"){
  scale = width * 3;
  var projection = d3.geo.albers()
      .rotate([120, 0])
      .center([-0.7, 44.2])
      .scale(scale)
      .translate([width /2, height/1.25]);

  geography = "https://s3-us-west-2.amazonaws.com/opb-news-interactives/lib/topo/or_wa.json"

}

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(3);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)

var tooltip = d3.select("body")
	.append("div")
  .attr("id","tooltip");


  // function updateData(){

queue()
    .defer(d3.json, geography)
    // .defer(d3.json, "js/election_results.json")
    .defer(d3.json, "https://opb-data.s3.amazonaws.com/2016-05-election/election_results.json")
    .defer(d3.json, "http://opb-news-interactives.s3.amazonaws.com/lib/topo/orCities.json")
    .await(ready);

function ready(error, geography, resultsData, cities) {
  if (error) throw error;


  for (var i = 0; i < resultsData.length; i++) {
    if (resultsData[i].ap_race_number == "38427") {
      var demPres = resultsData[i].reporting_units;
    }
  }

  var demPresresultsData = demPres.reduce(function(result, county) {
      result[county.abreviation] = county;
      return result;
  }, {});

  var states = svg.selectAll('path.state')
      .data(topojson.feature(geography, geography.objects.counties).features) // change "counties" to desired boundary, if needed
      .enter()
       .append("path")
       .attr('class', 'state')
       .attr("class", function(d) {
          var inTheLead = demPresresultsData[( (d.properties.NAME).replace(/\s/g, ''))].unit_results[0].candidate;
          var reporting = demPresresultsData[( (d.properties.NAME).replace(/\s/g, ''))].unit_results[0].vote_total;
          // console.log(reporting && (reporting > 0));
          if ( inTheLead && (reporting > 0) ){
            return "state " + inTheLead;
          }
          else {
            return "state";
          }
       })
       .attr("d", path)
       .on("mouseover", function(){
         return tooltip
            .style("visibility", "visible");
       })
     	.on("mousemove", function(d){
        var candidate = demPresresultsData[( (d.properties.NAME).replace(/\s/g, ''))].unit_results;
        return tooltip
              .html(
                  "<h4>" + d.properties.NAME + " County</h4>" +
                  "<table style='width:100%'>" +
                    "<tr>" +
                      "<th>Candidate</th>" +
                      "<th  style='text-align:right;'>Votes</th>" +
                    "</tr>" +
                    "<tr>" +
                      "<td>" + candidate[0].candidate + "</td>" +
                      "<td style='text-align:right;'>" + numberWithCommas(candidate[0].vote_total) + "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td>" + candidate[1].candidate + "</td>" +
                      "<td style='text-align:right;'>" + numberWithCommas(candidate[1].vote_total) + "</td>" +
                    "</tr>" +
                  "</table>"
                )
              .style("top", function() {
                  if (event.pageY > height-80) {
                    return (event.pageY-80)+"px"
                  } else {
                    return (event.pageY-10)+"px"
                  }
                })
              .style("left", function() {
                  if (event.pageX > width-200) {
                    return (event.pageX-180)+"px"
                  } else {
                    return (event.pageX+10)+"px"
                  }
                });
      })
     	.on("mouseout", function(){
        return tooltip
            .style("visibility", "hidden");
      })
      ;

// Outline oregon
  svg.append("path")
      .datum(topojson.mesh(geography, geography.objects.counties, function(a, b) { return a === b; })) // change "counties" to desired boundary, if needed
      .attr("class", "borders")
      .attr("d", path);

// ADD CITIES
  svg.append("path")
      .datum(topojson.feature(cities, cities.objects.orCities))
      .attr("d", path)
      .attr("class", "place");

  svg.selectAll(".place-label")
      .data(topojson.feature(cities, cities.objects.orCities).features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("dy", ".35em")
      .attr("dx", ".5em")
      .text(function(d) { return d.properties.NAME; });

}
// }


// updateData();
//
// var inter = setInterval(function() {
//                 console.log("redrawing...");
//                 updateData();
//         }, 3000);

d3.select(self.frameElement).style("height", height + "px");

///

d3.select(window).on('resize', resize);
function resize() {
    width = parseInt(d3.select('#map').style('width'));
    width = width - margin.left - margin.right;
    height = width * mapRatio + margin.top + margin.bottom;

    if(showing == "Oregon"){
      scale = width * 9.5;
      translate = [width / 2, ((height + margin.top)/2)];
      // .translate([width /2, ((height + margin.top)/2)]);

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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
