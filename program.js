var spawn = require('child_process').spawn;
var duplex = require('duplexer');

module.exports = function(cmd, args) {
     var process = spawn(cmd, args);
    return duplex(process.stdin, process.stdout);
};