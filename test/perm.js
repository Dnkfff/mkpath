/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

 import mkpath from '../';
 import { stat as _stat } from 'fs';
 import { test } from 'tap';

test('async perm', function (t) {
    t.plan(2);
    let file = '/tmp/' + (Math.random() * (1<<30)).toString(16);
    
    mkpath(file, 0o755, function (err) {
        if (err) t.fail(err);
        else _stat(file, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0o777, 0o755);
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            }
        })
    });
});
//Octal literals are not allowed. Use the syntax '0o755'.ts(1121)
test('async root perm', function (t) {
    mkpath('/tmp', 0o755, function (err) {
        if (err) t.fail(err);
        t.end();
    });
    t.end();
});
