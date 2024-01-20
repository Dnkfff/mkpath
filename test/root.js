/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

const mkpath = require('../');
const path = require('path');
const fs = require('fs');
const test = require('tap').test;

test('root', function (t) {
    // '/' on unix, 'c:/' on windows.
    let file = path.resolve('/');

    mkpath(file, 0755, function (err) {
        if (err) throw err
        fs.stat(file, function (er, stat) {
            if (er) throw er
            t.ok(stat.isDirectory(), 'target is a directory');
            t.end();
        })
    });
});

