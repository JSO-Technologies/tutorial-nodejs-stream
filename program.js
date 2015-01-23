var trumpet = require('trumpet');
var through = require('through');

var uppercaseTranform = function(buff) {
    this.queue(buff.toString().toUpperCase());
};

var tr = trumpet();
tr.pipe(process.stdout);

var trStream = tr.select('.loud').createStream();
trStream
    .pipe(through(uppercaseTranform))
    .pipe(trStream);

process.stdin.pipe(tr);
