/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

const mkpath = require('../');
const fs = require('fs');
const test = require('tap').test;

test('sync perm', function (t) {
    t.plan(2);
    let file = '/tmp/' + (Math.random() * (1<<30)).toString(16) + '.json';
    
    mkpath.sync(file, 0o755);
    fs.stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.equal(stat.mode & 0o777, 0o755);
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    })
});

test('sync root perm', function (t) {
    t.plan(1);
    
    let file = '/tmp';
    mkpath.sync(file, 0o755);
    fs.stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    })
});
