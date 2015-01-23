var duplex = require('duplexer');
var through = require('through');

module.exports = function(counter) {
    var count = {};

    var inStream = through(
        function(buff) {
            count[buff.country] = (count[buff.country] || 0) + 1;
        },
        function() {
            counter.setCounts(count);
        }
    );

    return duplex(inStream, counter);
};