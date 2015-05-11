// validate contact form
$(function() {
    // fix for iOS nav fixed position - keeps the nav at the top
    if (navigator.userAgent.match(/(iPhone|iPad)/)) {
        $(document).on('focus', 'input, textarea', function() {
            $('.navbar').css('position', 'absolute');
        });
    }
    // end fix for iOS nav fixed position

    $('.contact-us').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            },
        },
        //bootstrap hiddden to not show help-block or help-inline errors
        // errorPlacement necessary to eliminate label breaking rounded corners on the right
        errorPlacement: function(error, element) {},
        errorClass: "hidden",
        // end bootstrap hidden error

        highlight: function(element) {
            // declare variable to get id element name and the number 1 to keep it unique
            var id_attr = "#" + $(element).attr("id") + "1";
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
        },
        unhighlight: function(element) {
            // declare variable to get id element name and the number 1 to keep it unique
            var id_attr = "#" + $(element).attr("id") + "1";
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "process.php",
                success: function() {
                    $(".contact-us").fadeOut('fast', function() {
                        $('.contact-us').html(data);

                    });
                    $('#success').fadeIn();

                },
                error: function() {
                    $('.contact-us').fadeTo("slow", 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
});