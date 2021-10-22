$(document).ready(function() {
    $('.delete-student').on('click', function(e) {
        $target = $(e.target);
        // console.log($target.attr('data-id'));
        const id = $target.attr('data-id');
        const conf = confirm("Are You Sure Boss?");
        if (conf) {
            $.ajax({
                type: "GET",
                url: "/delete/" + id,
                success: function(res) {
                    alert("Data Deleted!!!");
                    window.location.href = "/";
                },
                error: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert("Okay... Data Is Safe Now...")
        }
    });


    $('.courses').on('change', function(e) {
        // alert("Hi");
        // console.log($('.courses option:selected').text());
        const data = $('.courses option:selected').text();
        if (data == "Laravel") {
            $('.fees').val(10000);
        } else if (data == "Node JS") {
            $('.fees').val(15000);
        } else if (data == "Web Designing") {
            $('.fees').val(8500);
        }
    });


    $('.edit-student').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        const conf = confirm("Are You Sure To Update?");
        if (conf) {
            $.ajax({
                type: "POST",
                url: "/update/update-student/" + id,
                success: function(res) {
                    alert("Data Updated!!!");
                    window.location.href = "/";
                },
                error: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert("Okay... Data Is Not Updated...");
            window.location.href = "/";
        }
    });


    $('button[type="submit"]').prop("disabled", true);
    var a = 0;
    $('#image').on('change', function(e) {
        const ext = $('#image').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            $("#preview").attr("style", "display:none");
            $('#error2').slideDown("slow");
            $('#error1').slideUp("slow");
            a = 0;
        } else {
            const imgSize = this.files[0].size;
            if (imgSize > 1000000) {
                $("#preview").attr("style", "display:none");
                $('#error1').slideDown("slow");
                a = 0;
            } else {
                a = 1;
                $('#error1').slideUp("slow");
            }
            $('#error2').slideUp("slow");
            if (a == 1) {
                const [file] = image.files
                if (file) {
                    $("#preview").attr("style", "display:inline");
                    preview.src = URL.createObjectURL(file);
                }
                $('button[type="submit"]').prop("disabled", false);
            }
        }

    });


    $('.modalView').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/getformodal/' + id,
            success: function(res) {
                let show = '<div class="row"> <div class="col-md-3"><img src="/uploads/' + res.img + '" /></div><div class="col-md-9"><h2>' + res.firstName + " " + res.lastName + '</h2><h4>' + res.contact + '</h4><br><h4>' + res.email + '</h4><h3>' + res.course + '</h3></div></div>'
                $('.modal-body').html(show);
                $('#exampleModalCenter').modal('show');
            },
            error: function(e) {
                alert('Something went wrong bhai...');
            }
        });
    });
});