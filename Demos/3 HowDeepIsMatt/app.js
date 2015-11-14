
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodoverride = require('method-override');
var errorHandler = require('error-handler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());

var urlEncodedOptions = {
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded'
};
app.use(bodyParser.urlencoded(urlEncodedOptions));

app.use(methodoverride());

// Create the routes here
var router = express.Router();

// Intercepts every request
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    
    next();
});

router.get('/', routes.where);
router.get('/here', routes.hereiam);

app.use(router);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

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
