// console.log("hello");
// d3.json("/data").then((data) => {
//     console.log(data);

if (window.location.pathname === "/") {
    // api requests
    function getAllTodos() {
        $.ajax({
            url:"/api",
            method: "GET",
            success: response => {
                console.log(response);
            },
            error: err => {
                console.log(err);
            }
        })
    }
​
    function postCreateTodo() {
        $.ajax({
            url: "/api//create_todo",
            method: "POST",
            data:{
                "fuel_eff": $("#carsize").val()
            },
            success: response => {
                console.log(response);
            },
            error: err => {
                console.log(err);
            }
        })
    }
​
    $("#add-todo").on("submit", () => {
        postCreateTodo();
    });
​
    getAllTodos();
}

   var startLocation= text(document.getElementById("startLocation").value),
   endLocation= text(document.getElementById("endLocation").value),
   startDate= Date(document.getElementById("startDate").value),
   endDate= Date(document.getElementById("endDate").value),
   MPG= text(document.getElementById("carSize").value),
   oilGrade= text(document.getElementById("oilGrade").value),
   totalMiles= int(document.getElementsByName("totalMiles").value);
   state=[];

   // find the state from the start location input and end location input
   function getState(address) {
   console.log(startLocation);
        // Make sure the address is a string.
        if (typeof address !== "string") throw "Address is not a string.";
    
        // Trim the address.
        address = address.trim();
    
        // Make an object to contain the data.
        var returned = {};
    
        // Find the comma.
        var comma = address.indexOf(',');
    
        // Pull out the city.
        returned.city = address.slice(0, comma);
    
        // Get everything after the city.
        var after = address.substring(comma + 2); // The string after the comma, +2 so that we skip the comma and the space.
    
        // Find the space.
        var space = after.lastIndexOf(' ');
    
        // Pull out the state.
        returned.state = after.slice(0, space);
    
        // Pull out the zip code.
        returned.zip = after.substring(space + 1);
    
        // Return the data.
        return returned;
    }
    
    state = getState(address);
   
    // find the correlating region from the state
    function getRegion(state){
    for (var i = 0; i<data.regionstates.length; i++) {
        if ( data.regionstates[i] === state) {
            return data.regionstates[i][1].toLowerCase().replace(/\s/g, '')
         // find the oil grade from user input and return the first letter lowercase
    function getOilGrade(oilGrade){
        for (var i = 0; i< oilGrade.value ; i++) {
        return oilGrade.toLowerCase.charAt(0)
        // concatinate region name + "_" + oilgrade
        let regionLookup= state.concat('_', oilGrade) 
        //find the correct dataset 
       for (var i = 0; i<data.length; i++) {
        if ( data[i].regionLookup = regionLookup) 
        return data.regionLookup
       
        };
        };}

    };
    
    //find date
    function findDate(date){
        
    };

    //find price 
    gasPrice=[]
    function findPrice(){

    };

    // var L = parseFloat(document.getElementById("L").value),
    // S = parseFloat(document.getElementById("S").value),
    // result = ( 10 * ( 3 + ( L * 0.5 ) ) * S ) / 60;
   
    function totalCost(startLocation, endLocation, startDate, endDate, MPG, oilGrade) {
    totalCost= (totalMiles/MPG) * gasPrice 
   
    
    
    }
