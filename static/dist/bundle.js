(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var PRECISION = 1e5

function decode( value ) {

  var points = []
  var lat = 0
  var lon = 0

  var values = decode.integers( value, function( x, y ) {
    lat += x
    lon += y
    points.push([ lat / PRECISION, lon / PRECISION ])
  })

  return points

}

decode.sign = function( value ) {
  return value & 1 ? ~( value >>> 1 ) : ( value >>> 1 )
}

decode.integers = function( value, callback ) {

  var values = 0
  var x = 0
  var y = 0

  var byte = 0
  var current = 0
  var bits = 0

  for( var i = 0; i < value.length; i++ ) {

    byte = value.charCodeAt( i ) - 63
    current = current | (( byte & 0x1F ) << bits )
    bits = bits + 5

    if( byte < 0x20 ) {
      if( ++values & 1 ) {
        x = decode.sign( current )
      } else {
        y = decode.sign( current )
        callback( x, y )
      }
      current = 0
      bits = 0
    }

  }

  return values

}

module.exports = decode

},{}],2:[function(require,module,exports){
var PRECISION = 1e5
var CHARCODE_OFFSET = 63
var CHARMAP = {}

for( var i = 0x20; i < 0x7F; i++ ) {
  CHARMAP[ i ] = String.fromCharCode( i )
}

function encode( points ) {

  // px, py, x and y store rounded exponentiated versions of the values
  // they represent to compute the actual desired differences. This helps
  // with finer than 5 decimals floating point numbers.
  var px = 0, py = 0

  return reduce( points, function( str, lat, lon ) {

    var x = Math.round( lat * 1e5 )
    var y = Math.round( lon * 1e5 )

    str += chars( sign( ( x - px ) ) ) +
      chars( sign( ( y - py ) ) )

    px = x
    py = y

    return str

  })

}

function reduce( points, callback ) {

  var point = null

  var lat = 0
  var lon = 0
  var str = ''

  for( var i = 0; i < points.length; i++ ) {
    point = points[i]
    lat = point.lat || point.x || point[0]
    lon = point.lng || point.y || point[1]
    str = callback( str, lat, lon )
  }

  return str

}

function sign( value ) {
  return ( value < 0 ) ? ~( value << 1 ) : ( value << 1 )
}

function charCode( value ) {
  return (( value & 0x1F ) | 0x20 ) + 63
}

function chars( value ) {

  var str = ''

  while( value >= 0x20 ) {
    str += CHARMAP[ charCode( value ) ]
    value = value >> 5
  }

  str += CHARMAP[ value + 63 ]

  return str

}

module.exports = encode

},{}],3:[function(require,module,exports){
module.exports = {
  encode: require( './encode' ),
  decode: require( './decode' ),
}

},{"./decode":1,"./encode":2}],4:[function(require,module,exports){
document.addEventListener("DOMContentLoaded", function(){
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.090, lng: -95.7129 },
      zoom: 5,
      mapTypeId: "roadmap",
    });

    directionsRenderer.setMap(map);

    // document.getElementById("myForm").addEventListener('submit', checkForm);

    document.getElementById("submit").addEventListener("click", () => {
      let allAreFilled = true;
      document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
        if (!allAreFilled) return;
        if (!i.value) allAreFilled = false;
      })
      if (allAreFilled) {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.getElementById("directions-panel").style.display = "inline";
      }
      else
      {
        alert("Please complete all the required fields.");
      }
    });
    
    var input = document.getElementById('startLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setComponentRestrictions({
      country: ["us"],
    });

    var input2 = document.getElementById('endLocation');
    var autocomplete2 = new google.maps.places.Autocomplete(input2);
    autocomplete2.setComponentRestrictions({
      country: ["us"],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      document.getElementById('startLat').value = place.geometry.location.lat();
      document.getElementById('startLon').value = place.geometry.location.lng();
      var state;
      place.address_components.forEach(element => {
        if(element.types[0] == "administrative_area_level_1") state = element.short_name;
      });
      // alert(state); // here's the state
    });
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {
      var place = autocomplete2.getPlace();
      document.getElementById('startLat').value = place.geometry.location.lat();
      document.getElementById('startLon').value = place.geometry.location.lng();
      var state;
      place.address_components.forEach(element => {
        if(element.types[0] == "administrative_area_level_1") state = element.short_name;
      });
      // alert(state); // here's the state
    });

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      // const waypts = []
      
      // var test = [{lat: 35.106, lng: -106.62}, {lat: 33.75, lng: -84.38}];
      // console.log(test[1]);


      // waypts.push({
      //   location: test[1]
      // })
      // waypts.push({
      //   location:'chicago, il'
      // })

      
      // var waypts = new Array();
      // var stops =  Math.floor(totalMiles / 300);
      // if (stops >= 1 )   {
      //     var mapPoints = null; //need to calculate lat/long or states of waypoints here, use python for list
          
          

      //     //GET all lat/longs in a straight line between 2 distances, run a loop and pick the lat/long @ every 300 miles along

      //     for (var j = 0; j < stops; j++) {    
      //         var latx = null; // latitutde of waypoint
      //         var longy = null; //longittude of waypoint
      //         var address = new google.maps.LatLng(latx, longy)    
      //         if (address !== "") {    
      //             waypts.push({    
      //                 location: address,    
      //                 stopover: true  // used to show marker on map for waypoints    
      //             });    
      //         }    
      //     }
      // }

      // else 
      // var waypts = null;
      
      
      
      
      
      var polyline = require('google-polyline');
      
      var request = {
        origin: document.getElementById("startLocation").value,
        destination: document.getElementById("endLocation").value,
        travelMode: "DRIVING"
        };
      
      const waypts = []
      directionsService
        .route(request, function (result, status){
            if (status == "OK") {
              directionsRenderer.setDirections(result);
              var waypoints = polyline.decode(result.routes[0].overview_polyline);
              
              startLatLong = waypoints[0];
              endLatLong = waypoints[waypoints.length-1];

              waypoints.shift() // Get rid of first long/lat (start location)
              waypoints.pop() // get rid of last long/lat (end location)
              

              currentLatLong = startLatLong;

                            
            carType = $("#carSize").val();
            if (carType == "compact") {
              mPG = 37;
              fuelTank = 12;
            } else if (carType == "sedan") {
              mPG = 34;
              fuelTank = 15;
            } else if (carType == "suv") {
              mPG = 30;;
              fuelTank = 19;
            } else {
              mPG = 23;
              fuelTank = 25;
            }

            waypointDist = mPG * fuelTank;
            console.log(waypointDist);


              waypoints.forEach(element => {
                var mileConversion = 0.000621371;
                var distance = mileConversion * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(currentLatLong[0], currentLatLong[1]), new google.maps.LatLng(element[0], element[1])));


                if (distance <= waypointDist) {
                  tempLatLong = element;
                } else {
                  newWayPoint = {};
                  newWayPoint["lat"] = tempLatLong[0];
                  newWayPoint["lng"] = tempLatLong[1]
                  waypts.push({
                    location: newWayPoint
                  })
                  currentLatLong = element;
                }
              })
              directionsService
              .route({
                origin: document.getElementById("startLocation").value,
                destination: document.getElementById("endLocation").value,
                waypoints: waypts, // ADD WAYPOINTS HERE IF WE HAVE THEM
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
              })
              .then((response) => {
                directionsRenderer.setDirections(response);
                const route = response.routes[0];
                const summaryPanel = document.getElementById("directions-panel");
                summaryPanel.innerHTML = "";
      
                var totalMiles = 0;
      
                // For each route, display summary information.
                for (let i = 0; i < route.legs.length; i++) {
                  const routeSegment = i + 1;
                  summaryPanel.innerHTML +=
                    "<b>Route Segment: " + routeSegment + "</b><br>";
                  summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                  summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                  summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
                  totalMiles = totalMiles + (route.legs[i].distance.value / 1609.34); // Convert to Miles
                }
                

                // For each route, capture state information.
                states = [];
                for (let i = 0; i < route.legs.length; i++) {
                  var address = route.legs[i].start_address;
                  if (address.replace(/[^,]/g, "").length == 2) {
                    const indexOfFirst = address.indexOf(",");
                    const finalIndex = indexOfFirst + 4;
                    var stateAbbr = address.substring(indexOfFirst+2,finalIndex);
                    state = abbrState(stateAbbr,'name');
                    states.push(state);

                  } else {
                    const indexOfFirst = address.indexOf(",");
                    const indexOfSecond = address.indexOf(",",(indexOfFirst + 1));
                    const finalIndex = indexOfSecond + 4;
                    var stateAbbr = address.substring(indexOfSecond+2,finalIndex);
                    state = abbrState(stateAbbr,'name');
                    states.push(state);
                  }
                   
                }
                console.log(states);
                
                //const geocoder = new google.maps.Geocoder();
                //geocodeLatLng(waypts, geocoder);

                // Send user values to python 
                //var states = ['Colorado', 'Illinois'];
                var statesJson = JSON.stringify(states);
      
                $.ajax({
                  url: "/api/create_todo",
                  method: "POST",
                  data:{
                      "fuel_eff": $("#carSize").val(),
                      "start_date": $("#startDate").val(),
                      "fuel_type": $("#oilGrade").val(),
                      "states": statesJson
                  },
                  success: response => {
                      var totalCost = response;
                      document.getElementById("cost_modal").innerHTML = totalCost * (document.getElementById("returnTrip").checked == true ? 2 : 1);
                      document.getElementById("cost_head").innerHTML = totalCost * (document.getElementById("returnTrip").checked == true ? 2 : 1);
                      document.getElementById("dist_modal").innerHTML = String(Math.round(totalMiles) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
                      $('#costModal').modal('show');
                  },
                  error: err => {
                      console.log(err);
                  }
              })
              //   PUT OUR ESTIMATE HERE cost_modal --  (Total Miles / Miles Per Gallon) * Price of Gallon of Gas
              //   const costModal = document.getElementById("cost_modal");
              //   document.getElementById("dist_modal").innerHTML = String(Math.round(totalMiles) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
              //   document.getElementById("cost_modal").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
              //   document.getElementById("cost_head").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
              })
        .catch((e) => window.alert("Directions request failed due to " + status));
      }
        });    
            }
        })  
    
        
      
      
      
      
      
//       directionsService
//         .route({
//           origin: document.getElementById("startLocation").value,
//           destination: document.getElementById("endLocation").value,
//           waypoints: waypts, // ADD WAYPOINTS HERE IF WE HAVE THEM
//           optimizeWaypoints: true,
//           travelMode: google.maps.TravelMode.DRIVING,
//         })
//         .then((response) => {
//           directionsRenderer.setDirections(response);
//           const route = response.routes[0];
//           const summaryPanel = document.getElementById("directions-panel");
//           summaryPanel.innerHTML = "";

//           var totalMiles = 0;

//           // For each route, display summary information.
//           for (let i = 0; i < route.legs.length; i++) {
//             const routeSegment = i + 1;
//             summaryPanel.innerHTML +=
//               "<b>Route Segment: " + routeSegment + "</b><br>";
//             summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//             summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//             summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//             totalMiles = totalMiles + (route.legs[i].distance.value / 1609.34); // Convert to Miles
//           }
          

//           // Send user values to python 
//           var states = ['Colorado', 'Illinois'];
//           var statesJson = JSON.stringify(states);

//           $.ajax({
//             url: "/api/create_todo",
//             method: "POST",
//             data:{
//                 "fuel_eff": $("#carSize").val(),
//                 "start_date": $("#startDate").val(),
//                 "fuel_type": $("#oilGrade").val(),
//                 "states": statesJson
//             },
//             success: response => {
//                 var totalCost = response;
//                 document.getElementById("cost_modal").innerHTML = totalCost;
//                 document.getElementById("cost_head").innerHTML = totalCost;
//                 document.getElementById("dist_modal").innerHTML = String(Math.round(totalMiles) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
//                 $('#costModal').modal('show');
//             },
//             error: err => {
//                 console.log(err);
//             }
//         })
//         //   PUT OUR ESTIMATE HERE cost_modal --  (Total Miles / Miles Per Gallon) * Price of Gallon of Gas
//         //   const costModal = document.getElementById("cost_modal");
//         //   document.getElementById("dist_modal").innerHTML = String(Math.round(totalMiles) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
//         //   document.getElementById("cost_modal").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
//         //   document.getElementById("cost_head").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
//         })
//   .catch((e) => window.alert("Directions request failed due to " + status));
// }
//   });

},{"google-polyline":3}]},{},[4]);



function geocodeLatLng(waypointArray, geocoder) {

states = [];

waypointArray.forEach(element =>{
  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        
        var address = response.results[0].formatted_address;
        const indexOfFirst = address.indexOf(",");
        const indexOfSecond = address.indexOf(",",(indexOfFirst + 1));
        const finalIndex = indexOfSecond + 2;
        var state = address.substring(indexOfSecond,finalIndex);
        console.log(state)
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
  })
}



function abbrState(input, to){
    
  var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];

  if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(i = 0; i < states.length; i++){
          if(states[i][0] == input){
              return(states[i][1]);
          }
      }    
  } else if (to == 'name'){
      input = input.toUpperCase();
      for(i = 0; i < states.length; i++){
          if(states[i][1] == input){
              return(states[i][0]);
          }
      }    
  }
}
