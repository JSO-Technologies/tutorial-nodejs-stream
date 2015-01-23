var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function() {
    var result = [];
    var currentGenre;
    var groupStream = through(
        function(line) {
            if (line.length === 0) return;

            var obj = JSON.parse(line);
            if(obj.type === 'genre') {
                currentGenre = {
                    name: obj.name,
                    books: []
                };
                result.push(currentGenre);
            }

            else {
                currentGenre.books.push(obj.name);
            }
        },
        function() {
            this.queue(result.map(JSON.stringify).join('\n') + '\n');
            this.queue(null);
        }
    );

    var print = through(
        function(obj) {
            console.log(obj);
        }
    );

    return combine(split(), groupStream, zlib.createGzip());
};