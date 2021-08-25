// if (window.location.pathname === "/") {
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

    function postCreateTodo() {

        $.ajax({
            url: "/api/create_todo",
            method: "POST",
            data:{
                "fuel_eff": $("#carSize").val(),
                "start_date": $("#startDate").val(),
                "fuel_type": $("#oilGrade").val(),
            },
            success: response => {
                var totalCost = response;
                document.getElementById("cost_modal").innerHTML = totalCost;
                $('#costModal').modal('show');
            },
            error: err => {
                console.log(err);
            }
        })
    }

    $("#submit").on("click", (e) => {
        e.preventDefault();
        postCreateTodo();        
    });

    // getAllTodos();
// }