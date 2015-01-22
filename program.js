var through = require('through');
var split = require('split');

var line = 0;

var caseTransformer = function(buff) {
    line ++;
    this.queue((line % 2 == 0 ?
        buff.toString().toUpperCase() :
        buff.toString().toLowerCase())
        + '\n');
};

process.stdin
    .pipe(split())
    .pipe(through(caseTransformer))
    .pipe(process.stdout);