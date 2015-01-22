var http = require('http');
var through = require('through');

var upperCaseTranform = function(buff) {
    this.queue(buff.toString().toUpperCase());
};

var server = http.createServer(function(req, res) {
    if(req.method !== 'POST') {
        res.writeHead(404, {'content-type': 'plain/text'});
        res.write('Service not found : Only POST is supported');
        res.end();
    }
    else {
        req.pipe(through(upperCaseTranform)).pipe(res);
    }
});

server.listen(process.argv[2]);