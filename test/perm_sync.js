/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

import { sync } from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('sync perm', function (t) {
    t.plan(2);
    let file = '/tmp/' + (Math.random() * (1<<30)).toString(16) + '.json';
    
    sync(file, 0755);
    _stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.equal(stat.mode & 0777, 0755);
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    })
});

test('sync root perm', function (t) {
    t.plan(1);
    
    let file = '/tmp';
    sync(file, 0755);
    _stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    })
});
