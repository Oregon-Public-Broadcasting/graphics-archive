d3.json("lhs.json", function(error, lhs) {
  if (error) return console.error(error);
  console.log(lhs);
});

var width = 960,
    height = 1160;

var projection = d3.geo.albersUsa() //d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("lhs.json", function(error, lhs) {
  svg.append("path")
      .datum(topojson.feature(lhs, lhs.objects.lhs))
      .attr("d", path);
});
