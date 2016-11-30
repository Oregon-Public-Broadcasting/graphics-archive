var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = 1
  , height = width * mapRatio

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([-982, 1752])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  scale = width * 183
  var projection = d3.geo.albers()
      .rotate([120, 0])
      .center([-2.65, 45.55])
      .scale(scale)
      .translate([width /2, height/2]);
  geography = "js/multnomahPrecinct.json"

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)

var tooltip = d3.select("body")
	.append("div")
  .attr("id","tooltip");

console.log(rateById);

queue()
    .defer(d3.json, geography) // Pick one of the geography files above
    .defer(d3.tsv, "gasTax.tsv")
    .defer(d3.tsv, "gasTax.tsv", function(d) { rateById.set(d.Precinct, +d.leadBy); })
    .await(ready);

function ready(error, geography, precinctData) {
  if (error) throw error;

console.log(precinctData);

  var precinct = svg.selectAll('path.precinct')
      .data(topojson.feature(geography, geography.objects.multnomahPrecinct).features) // change "counties" to desired boundary, if needed
      .enter()
       .append("path")
       .attr('class', 'precinct')
       .attr("class", function(d) {
           return "precinct " + quantize(rateById.get(d.properties.FIRST_PREC)) + " ";
       })
      //  .style("opacity", function(d) {
      //      var precinctNumber = d.properties.FIRST_PREC;
      //        for (var i = 0; i < precinctData.length; i++) {
      //          if (precinctData[i].Precinct == d.properties.FIRST_PREC){
      //            return precinctData[i]["Total Votes"] / 6789;
      //          }
      //        }
      //  })
       .attr("d", path)
       .on("mouseover", function(){
              return tooltip
                 .style("visibility", "visible");
            })
           .on("mousemove", function(d){
             var precinctNumber = d.properties.FIRST_PREC;
               for (var i = 0; i < precinctData.length; i++) {
                 if (precinctData[i].Precinct == d.properties.FIRST_PREC){
                   var precinctNumberData = precinctData[i];
                  //  console.log(precinctNumberData);

                   return tooltip
                     .html(
                         "<h4>Precinct " + precinctNumber + "</h4>"
                         +
                         "<table style='width:100%'>" +
                           "<tr>" +
                             "<td>Yes</td>" +
                             "<td style='text-align:right;'>" + precinctNumberData["Yes Percent"] + "</td>" +
                           "</tr>" +
                           "<tr>" +
                             "<td>No</td>" +
                             "<td style='text-align:right;'>" + precinctNumberData["No Percent"] + "</td>" +
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




                 } else {
                  //  console.log("nope");
                 }
               }

           })
           .on("mouseout", function(){
             return tooltip
                 .style("visibility", "hidden");
           })
       ;

  svg.append("path")
      .datum(topojson.mesh(geography, geography.objects.multnomahPrecinct, function(a, b) { return a !== b; })) // change "counties" to desired boundary, if needed
      .attr("class", "borders")
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(geography, geography.objects.multnomahPrecinct, function(a, b) { return a == b; })) // change "counties" to desired boundary, if needed
      .attr("class", "outline")
      .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");

///

d3.select(window).on('resize', resize);
function resize() {
    width = parseInt(d3.select('#map').style('width'));
    width = width - margin.left - margin.right;
    height = width * mapRatio;

    scale = width * 183
    translate = [width / 2, height / 2]

    // update projection
    projection
      .scale(scale)
      .translate(translate);

    // resize the map container
    svg
    .attr("width", width)
    .attr("height", height);

    // resize the map
    svg.selectAll('.precinct').attr('d', path);
    svg.selectAll('.borders').attr('d', path);
    svg.selectAll('.outline').attr('d', path);

}

// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
