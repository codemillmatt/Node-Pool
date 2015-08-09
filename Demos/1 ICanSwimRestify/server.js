var port = process.env.port || 1337;

var restify = require('restify');

var server = restify.createServer();

server.get('/pool/:name', function (req, res, next) {
    // Send JSON back (note the JSON is not valid, but RESTIFY will make it so
    res.send({ thePoolName: req.params.name });
    
    // Always need to call next()
    next();
});

server.listen(port);