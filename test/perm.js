/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

 const mkpath = require('../');
 const fs = require('fs');
 const test = require('tap').test;

 // I honestly do not understand those magic numbers, which are there like 0777, 0755. 
test('async perm', function (t) {
    t.plan(2);
    let file = '/tmp/' + (Math.random() * (1<<30)).toString(16);
    
    mkpath(file, 0755, function (err) {
        if (err) t.fail(err);
        else fs.stat(file, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0755);
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            }
        })
    });
});
//Octal literals are not allowed. Use the syntax '0o755'.ts(1121)
test('async root perm', function (t) {
    mkpath('/tmp', 0755, function (err) {
        if (err) t.fail(err);
        t.end();
    });
    t.end();
});
