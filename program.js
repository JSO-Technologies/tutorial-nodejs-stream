var concat = require('concat-stream');
var through = require('through');

var reverse = function(buff) {
    console.log(buff.toString().split('').reverse().join(''));
};

process.stdin
    .pipe(concat(reverse));