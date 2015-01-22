var through = require('through');

var uppercaseTransformer = function(buff) {
    this.queue(buff.toString().toUpperCase());
};

process.stdin
    .pipe(through(uppercaseTransformer))
    .pipe(process.stdout);