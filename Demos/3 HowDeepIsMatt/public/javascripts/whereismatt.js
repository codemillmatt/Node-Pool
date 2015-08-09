var socket = io();

socket.on('hereiam', function (loc) {
    var listTemplate = "<li class='list-group-item'>" +
        "<img src='/images/IMG_1617.JPG' height='53' width='40' class='img-circle' style='margin-right:20px;' />" +
        "<span class='lead'>" + loc + "</span></li>";

    $("#theList").append(listTemplate);
});