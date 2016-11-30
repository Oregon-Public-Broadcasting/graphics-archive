
var width = $( "body" ).width();
    height = width/2.25;

var radius = d3.scale.sqrt()
    .domain([0, 1e6])
    .range([0, 10]);

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([width / 2, height/2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

queue()
    .defer(d3.json, "js/states.json")
    .defer(d3.json, "js/ewaste.json")
    .await(ready);

function ready(error, us, ewaste) {
  if (error) throw error;

  console.log(us.objects.states);


  svg.selectAll(".state")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("class", function(d) { return "state state" + d.id; })
      .attr("d", path);

  svg.selectAll(".symbol")
      .data(ewaste.features)
      .enter().append("path")
      .filter(function(d) { return d.properties.Exported == "Yes" })
      .attr("class", "symbol")
      .attr("d", path.pointRadius(function(d) { return 4; }));
}


$("body").prepend("<div class='legend'></div>")
$(".legend").html('<div class="state_w_laws"></div>State with e-waste laws <div class="state_wo_laws"></div>State without e-waste laws <div class="orange_dot"></div>Exported electronics')
