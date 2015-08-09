var socket = io();

$('#tellem').click(function () {
    var loc = $('#whereami').val();
    socket.emit('hereiam', loc);

    $('#whereami').val('');

    return false;
});