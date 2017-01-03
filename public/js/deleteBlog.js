$(() => {

    $("#deleteBlog").click((e) => {
        e.preventDefault();
        let search = $("#deleteBar").val();
        $.ajax({
            url: `/admin/${search}`,
            method: 'DELETE'
        })
            .then((data) => {
                window.location.href = "/admin";
            });
    });
});

