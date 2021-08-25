document.addEventListener("DOMContentLoaded", function(){
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.7755910265767, lng: -84.39626354416843 },
      zoom: 13,
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
      directionsService
        .route({
          origin: document.getElementById("startLocation").value,
          destination: document.getElementById("endLocation").value,
          waypoints: null, // ADD WAYPOINTS HERE IF WE HAVE THEM
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

        //   PUT OUR ESTIMATE HERE cost_modal --  (Total Miles / Miles Per Gallon) * Price of Gallon of Gas
        //   const costModal = document.getElementById("cost_modal");
        //   document.getElementById("dist_modal").innerHTML = String(Math.round(totalMiles) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
        //   document.getElementById("cost_modal").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)
        //   document.getElementById("cost_head").innerHTML = String(Math.round((totalMiles/document.getElementById("carSize").value) * 3.15) * (document.getElementById("returnTrip").checked == true ? 2 : 1)); // Put Gas Price Per Gallon Here and MPG (15 MPG now)

          $('#costModal').modal('show');
        })
  .catch((e) => window.alert("Directions request failed due to " + status));
}
  });
