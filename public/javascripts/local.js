$(document).ready(function () {
    $(".button-collapse").sideNav();

    $(".js-device-on").click(function () {
        sendSocket($(this).data('device'), 't');
    });

    $(".js-device-off").click(function () {
        sendSocket($(this).data('device'), 'f');
    });

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