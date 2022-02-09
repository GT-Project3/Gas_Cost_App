// add map.fitBounds(directionsDisplay.getDirections().routes[0].bounds);
// into DirectionsService to get list of bounds

      function getWaypoints() {    
        //Define a variable for waypoints.    
        var waypts = new Array();
        var stops =  Math.floor(totalMiles / 300);
        if (stops >= 1 )   {
            var mapPoints = null; //need to calculate lat/long or states of waypoints here, use python for list
            
            

            //GET all lat/longs in a straight line between 2 distances, run a loop and pick the lat/long @ every 300 miles along

            
            for (var j = 0; j < stops; j++) {    
                var latx = null; // latitutde of waypoint
                var longy = null; //longittude of waypoint
                var address = new google.maps.LatLng(latx, longy)    
                if (address !== "") {    
                    waypts.push({    
                        location: address,    
                        stopover: true  // used to show marker on map for waypoints    
                    });    
                }    
            }
        }

        else 
        var waypts = null;
    }

    // const bounds = new google.maps.LatLngBounds()
    // sortedDistanceIndex.slice(0, 2)
    // .forEach(x => {
    //  let coords = branches.features[x.index].geometry.coordinates
    //  bounds.extend(new google.maps.LatLng(coords[1], coords[0]))
    // })
