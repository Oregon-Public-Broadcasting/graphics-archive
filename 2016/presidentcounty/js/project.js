/*******************************************
            DEFAULT MAP OPTIONS
Changing this one line will give you
the desired topojson and correct projection
*******************************************/
var showing =
"Oregon"
// "US"
// "OregonWashington"

var AP_RACE = "0";
var race;
var raceData;
/*******************************************/

var margin = {top: 30, left: 0, bottom: 0, right: 0}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .75
  , height = width * mapRatio + margin.top + margin.bottom;

var rateById = d3.map();

var colorDEM = 'rgba(6, 13, 162,';
var colorGOP = 'rgba(162, 6, 6,';

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


function updateData(){
  queue()
      .defer(d3.json, geography)
    // .defer(d3.json, "js/election_results.json")
    .defer(d3.json, "http://opb-data.s3.amazonaws.com/2016-11-08-election/election_results.json")
    // .defer(d3.json, "http://opb-news-interactives.s3.amazonaws.com/lib/topo/orCities.json")
    .await(ready);

  function ready(error, geography, resultsData) {
  if (error) throw error;

  for (var i = 0; i < resultsData.length; i++) {
    if (resultsData[i].ap_race_number == AP_RACE) {
      race = resultsData[i];
      var raceReportingUnits = resultsData[i].reporting_units;
    }
  }
  
  // updated date
  var date = new Date(resultsData[0]['updated']).format('h:MM TT | mmmm d, yyyy');
  $('#updated').html(date);

  raceData = raceReportingUnits.reduce(function(result, county) {
      result[county.abreviation] = county;
      return result;
  }, {});

    /* --------------------------------- */
    /* --------------------------------- */
    /* build states -------------------- */
    /* --------------------------------- */
    /* --------------------------------- */
    var states = svg.selectAll('path.state')
        .data(topojson.feature(geography, geography.objects.counties).features) // change "counties" to desired boundary, if needed
        .enter()
         .append("path")
         .attr('class', 'state')
         .attr("fill", function(d) {
            var unit = raceData[( (d.properties.NAME).replace(/\s/g, ''))].unit_results;
            var percentage = getVotePercent(unit, 0);
            var party = getParty(unit[0].candidate);
            
            if (unit[0].vote_total > 0)
            {
              if (party == 'Dem') { return colorDEM + percentage +')' }
              else if (party == 'GOP') { return colorGOP + percentage +')' }
            }
            else { return 'rgba(255,255,255)' }
            
         })
         .attr("d", path)

         // mouse over
         .on("mouseover", function(d){
            displayResults(d);

            // rolloever class
            d3.select(this.parentNode.appendChild(this)).transition()
              .attr('class', 'state unit-hover');
         })

         // click
         .on("click", function(d){
            displayResults(d);

            // rolloever class
            d3.select(this.parentNode.appendChild(this)).transition()
              .attr('class', 'state unit-hover');
         })

         // mouse out
       	.on("mouseout", function(){
            // toggle view
            $('#instructions').show();
            $('#map-result').hide();

            d3.select(this.parentNode.appendChild(this)).transition()
              .attr('class', 'state');
        })
        ;

    /* --------------------------------- */
    /* outline state ------------------- */
    /* --------------------------------- */
    svg.append("path")
        .datum(topojson.mesh(geography, geography.objects.counties, function(a, b) { return a === b; })) // change "counties" to desired boundary, if needed
        .attr("class", "borders")
        .attr("d", path);

  }
}

updateData();

var inter = setInterval(function() {
                console.log("redrawing...");
                updateData();
        }, 120000);

d3.select(self.frameElement).style("height", height + "px");


/* --------------------------------- */
/* --------------------------------- */
/* RESIZING ------------------------ */
/* --------------------------------- */
/* --------------------------------- */
d3.select(window).on('resize', resize);
function resize() {
    width = parseInt(d3.select('#map').style('width'));
    width = width - margin.left - margin.right;
    height = width * mapRatio + margin.top + margin.bottom;

    if(showing == "Oregon"){
      scale = width * 9.5;
      translate = [width / 2, ((height + margin.top)/2)];

    }
    else if(showing == "US"){
      scale = width
      translate = [width / 2, height / 2]

    }
    else if(showing == "OregonWashington") {
      scale = width * 3
      translate = [width / 2, height / 1.5]
    }

    // update projection
    projection
      .scale(scale)
      .translate(translate);

    // resize the map container
    svg.attr("width", width).attr("height", height);

    // resize the map
    // svg.select('.land').attr('d', path);
    svg.selectAll('.state').attr('d', path);
    svg.selectAll('.borders').attr('d', path);
}

/* --------------------------------- */
/* --------------------------------- */
/* numberWithCommas ---------------- */
/* --------------------------------- */
/* --------------------------------- */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* --------------------------------- */
/* --------------------------------- */
/* displayResults   ---------------- */
/* --------------------------------- */
/* --------------------------------- */

function displayResults(d)
{
  // toggle view
  $('#instructions').hide();
  $('#map-result').show();

  // get vars
  var county = ( (d.properties.NAME).replace(/\s/g, ''));
  var unit = raceData[county].unit_results;
  console.log(unit);

  // fill out data
  $('#county').text(county);
  $('#result').html('');
  unit.forEach(function (u, index) {
    var percent = Math.round(getVotePercent(unit, index) * 100);
    var party = getParty(u.candidate);
    var p = '';

    if (party == 'GOP' || party == 'Dem')
    {
      p = party[0];
      if (party[0] == 'G') {p = 'R'};
    }

    var r = '<tr> ' +
              '<td class="candidate">' + u['candidate'] + '<span class="' + party + '">' + p + '</span> </td>' +
              '<td class="bars show-for-large-up"><div class="bar-bg"><div class="bar-result" style="width: ' + percent + '%;"></div></div></td>' +
              '<td class="count show-for-large-up">' + u['vote_total'] + '</td>' +
              '<td class="percent">' + percent + '%</td>' +
            '</tr>';
    $('#result').append(r);
  });
}

/* --------------------------------- */
/* --------------------------------- */
/* get race values ----------------- */
/* --------------------------------- */
/* --------------------------------- */

// party
function getParty(name)
{
  var candidateObj = race['candidates'].filter(function(key) { return key['name'] ===  name});
  return candidateObj[0]['party'];
}

// vote total
function getVoteTotal(unit)
{
  var total = 0;
  for (var i = 0; i < unit.length; i ++)
  {
     total += unit[i].vote_total;
  }
  return total;
}

// percentage
function getVotePercent(unit, index)
{
  return unit[index].vote_total / getVoteTotal(unit);
}

var pymChild = new pym.Child();