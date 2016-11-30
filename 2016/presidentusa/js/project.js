/*******************************************
            DEFAULT MAP OPTIONS
Changing this one line will give you
the desired topojson and correct projection
*******************************************/
var showing =
//"Oregon"
 "US"
// "OregonWashington"

var AP_RACE = "38427";
var race;
var raceData;
/*******************************************/

var margin = {top: 30, left: 0, bottom: 0, right: 0}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .45
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
      // .defer(d3.json, "js/presidential_results.json")
      .defer(d3.json, "http://opb-data.s3.amazonaws.com/2016-11-08-election/presidential_results.json")
      // .defer(d3.json, "http://opb-news-interactives.s3.amazonaws.com/lib/topo/orCities.json")
      .await(ready);

  function ready(error, geography, resultsData) {
    if (error) throw error;

    // for (var i = 0; i < resultsData.length; i++) {
    //   if (resultsData[i].ap_race_number == AP_RACE) {
    //     race = resultsData[i];
    //     var raceReportingUnits = resultsData[i].reporting_units;
    //   }
    // }
    
    // updated date
    var date = new Date(resultsData['updated']['time']).format('h:MM TT | mmmm d, yyyy');
    $('#updated').html(date);

    // raceData = raceReportingUnits.reduce(function(result, county) {
    //     result[county.abreviation] = county;
    //     return result;
    // }, {});

    /* --------------------------------- */
    /* --------------------------------- */
    /* build states -------------------- */
    /* --------------------------------- */
    /* --------------------------------- */
    var states = svg.selectAll('path.state')
        .data(topojson.feature(geography, geography.objects.states).features) // change "counties" to desired boundary, if needed
        .enter()
         .append("path")
         .attr('class', 'state')
         .attr("fill", function(d) {
            if (stateToIdMap(d.id))
            {
              var postal = stateToIdMap(d.id).postal;
              var result = resultsData[postal];

              if (result.candidates.length > 0)
              {
                var percentage = (Math.round(result.candidates[0].vote_percent) / 100) + .2;
                var party = result.candidates[0].party;
              
                if (party == 'Dem') { return colorDEM + percentage +')' }
                else if (party == 'GOP') { return colorGOP + percentage +')' }
              }
              else
              {
                return 'rgb(228,228,228)';
              }
              
            }
            
         })
         .attr("d", path)

         // mouse over
         .on("mouseover", function(d){
            var state = stateToIdMap(d.id);
            var result = resultsData[state.postal];
            displayResults(result, state);

            // rolloever class
            d3.select(this.parentNode.appendChild(this)).transition()
              .attr('class', 'state unit-hover');
         })

         // click
         .on("click", function(d){
            var state = stateToIdMap(d.id);
            var result = resultsData[state.postal];
            displayResults(result, state);

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
        .datum(topojson.mesh(geography, geography.objects.states, function(a, b) { return a === b; })) // change "counties" to desired boundary, if needed
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

function displayResults(result, state)
{
  // toggle view
  $('#instructions').hide();
  $('#map-result').show();

  // fill out data
  $('#state').text(state.name);
  $('#result').html('');

  if (result.candidates.length == 0){
    $('#result').html('<tr><td class="candidate">No candidates reporting</td></tr>');
  }

  result.candidates.forEach(function (c, index) {
    var p = '';
    if (c.party == 'GOP' || c.party == 'Dem')
    {
      p = c.party[0];
      if (c.party[0] == 'G') {p = 'R'};
    }

    var r = '<tr> ' +
              '<td class="candidate">' + c['name'] + '<span class="' + c.party + '">' + p + '</span> </td>' +
              '<td class="bars show-for-large-up"><div class="bar-bg"><div class="bar-result" style="width: ' + c.vote_percent + '%;"></div></div></td>' +
              '<td class="count show-for-large-up">' + c['vote_total'] + '</td>' +
              '<td class="percent">' + Math.round(c.vote_percent) + '%</td>' +
            '</tr>';
    $('#result').append(r);
  });
}

/* --------------------------------- */
/* --------------------------------- */
// state to id in projection mapping
/* --------------------------------- */
/* --------------------------------- */

function stateToIdMap(id)
{
  var states = {
      '1': {'postal':  "AL", 'name': "Alabama"},
      '2': {'postal':  "AK", 'name': "Alaska"},
      '3': {'postal':  "AS", 'name': "American Samoa"},
      '4': {'postal':  "AZ", 'name': "Arizona"},
      '5': {'postal':  "AR", 'name': "Arkansas"},
      '6': {'postal':  "CA", 'name': "California"},
      '8': {'postal':  "CO", 'name': "Colorado"},
      '9': {'postal':  "CT", 'name': "Connecticut"},
      '10': {'postal':  "DE", 'name': "Delaware"},
      '11': {'postal':  "DC", 'name': "District Of Columbia"},
      // '': {'postal':  "FM", 'name': "Federated States Of Micronesia"},
      '12': {'postal':  "FL", 'name': "Florida"},
      '13': {'postal':  "GA", 'name': "Georgia"},
      // '': {'postal':  "GU", 'name': "Guam"},
      '15': {'postal':  "HI", 'name': "Hawaii"},
      '16': {'postal':  "ID", 'name': "Idaho"},
      '17': {'postal':  "IL", 'name': "Illinois"},
      '18': {'postal':  "IN", 'name': "Indiana"},
      '19': {'postal':  "IA", 'name': "Iowa"},
      '20': {'postal':  "KS", 'name': "Kansas"},
      '21': {'postal':  "KY", 'name': "Kentucky"},
      '22': {'postal':  "LA", 'name': "Louisiana"},
      '23': {'postal':  "ME", 'name': "Maine"},
      // '': {'postal':  "MH", 'name': "Marshall Islands"},
      '24': {'postal':  "MD", 'name': "Maryland"},
      '25': {'postal':  "MA", 'name': "Massachusetts"},
      '26': {'postal':  "MI", 'name': "Michigan"},
      '27': {'postal':  "MN", 'name': "Minnesota"},
      '28': {'postal':  "MS", 'name': "Mississippi"},
      '29': {'postal':  "MO", 'name': "Missouri"},
      '30': {'postal':  "MT", 'name': "Montana"},
      '31': {'postal':  "NE", 'name': "Nebraska"},
      '32': {'postal':  "NV", 'name': "Nevada"},
      '33': {'postal':  "NH", 'name': "New Hampshire"},
      '34': {'postal':  "NJ", 'name': "New Jersey"},
      '35': {'postal':  "NM", 'name': "New Mexico"},
      '36': {'postal':  "NY", 'name': "New York"},
      '37': {'postal':  "NC", 'name': "North Carolina"},
      '38': {'postal':  "ND", 'name': "North Dakota"},
      // '': {'postal':  "MP", 'name': "Northern Mariana Islands"},
      '39': {'postal':  "OH", 'name': "Ohio"},
      '40': {'postal':  "OK", 'name': "Oklahoma"},
      '41': {'postal':  "OR", 'name': "Oregon"},
      // '': {'postal':  "PW", 'name': "Palau"},
      '42': {'postal':  "PA", 'name': "Pennsylvania"},
      // '': {'postal':  "PR", 'name': "Puerto Rico"},
      '44': {'postal':  "RI", 'name': "Rhode Island"},
      '45': {'postal':  "SC", 'name': "South Carolina"},
      '46': {'postal':  "SD", 'name': "South Dakota"},
      '47': {'postal':  "TN", 'name': "Tennessee"},
      '48': {'postal':  "TX", 'name': "Texas"},
      '49': {'postal':  "UT", 'name': "Utah"},
      '50': {'postal':  "VT", 'name': "Vermont"},
      // '': {'postal':  "VI", 'name': "Virgin Islands"},
      '51': {'postal':  "VA", 'name': "Virginia"},
      '53': {'postal':  "WA", 'name': "Washington"},
      '54': {'postal':  "WV", 'name': "West Virginia"},
      '55': {'postal':  "WI", 'name': "Wisconsin"},
      '56': {'postal':  "WY", 'name': "Wyoming"}
  }

  return states[String(id)];
}

var pymChild = new pym.Child();