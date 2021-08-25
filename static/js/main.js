// if (window.location.pathname === "/") {
//     // api requests
//     function getAllTodos() {
//         $.ajax({
//             url:"/api",
//             method: "GET",
//             success: response => {
//                 console.log(response);
//             },
//             error: err => {
//                 console.log(err);
//             }
//         })
//     }

    function postCreateTodo() {
        $.ajax({
            url: "/api/create_todo",
            method: "POST",
            data:{
                "fuel_eff": $("#carSize").val()
            },
            success: response => {
                console.log($("#carSize").val());
            },
            error: err => {
                console.log(err);
            }
        })
    }

    $("#submit").on("click", (e) => {
        e.preventDefault();
        console.log(document.getElementById("carSize").value);
        postCreateTodo();
    });

    // getAllTodos();
// }