/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

const mkpath = require('../');
const fs = require('fs');
const test = require('tap').test;

test('sync', function (t) {
    t.plan(2);
    const x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    console.log('x = ' + x)
    const y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    console.log('y = ' + y)
    const z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    console.log('z = ' + z)

    let file = '/tmp/' + [x,y,z].join('/');
    
    try {
        let cord = mkpath.sync(file, 0o755);
        console.log(typeof cord)
    } catch (err) {
        t.fail(err);
        return t.end();
    }

    fs.stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.equal(stat.mode & 0o777, 0o755);
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    });
});

