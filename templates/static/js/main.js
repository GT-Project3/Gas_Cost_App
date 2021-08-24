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

    $("#add-todo").on("submit", () => {
        postCreateTodo();
    });

    getAllTodos();
}