
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.where);
app.get('/here', routes.hereiam);

var server = http.createServer(app);

var io = require('socket.io')(server);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));    
});

var edge = require('edge');

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('hereiam', function (msg) {
        console.log(msg);
        
        var depthFinder = edge.func(require('path').join(__dirname, 'DepthFinder.cs'));
        
        depthFinder(msg, function (err, res) {
            msg = msg + "<br/>" + res;

            socket.broadcast.emit('hereiam', msg);
        });
                
    });
});
