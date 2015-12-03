$(document).ready(function () {
    $(".js-img-stream").width($(".js-img-stream").parent().width());
    $(".js-audio-stream").width($(".js-img-stream").parent().width());
    
    $(".button-collapse").sideNav();

    $(".js-device-on").click(function () {
        sendSocket($(this).data('device'), 't');
    });

    $(".js-device-off").click(function () {
        sendSocket($(this).data('device'), 'f');
    });

    $(".js-stream-start").click(function () {
        sendGet('/stream-start',
            function () {
            },
            function () {
            }
        );
    });

    $(".js-stream-stop").click(function () {
        sendGet('/stream-stop',
            function () {
            },
            function () {
            }
        );
    });

    function sendGet(address, success, error) {
        $.ajax({
            url: address,
            type: 'GET',
            cache: false,
            success: success,
            error: error
        });
    }

    function sendSocket(device, command) {
        $.ajax({
            url: '/socket',
            type: 'POST',
            cache: false,
            data: {device: device, command: command},
            success: function (data) {
                console.log('Success');
            }
            , error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err)
            }
        });
    }
});