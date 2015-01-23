var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

var parser = tar.Parse();

var printHex = function (entry) {
    if(entry.type === 'File') {
        var md5sum = crypto.createHash('md5', { encoding: 'hex' });
        entry.pipe(md5sum).pipe(through(function(hex) {
            console.log(hex + ' ' + entry.path)
        }));
    }
};

process.stdin
    .pipe(decipher)
    .pipe(zlib.createGunzip())
    .pipe(parser)
    .on('entry', printHex);
