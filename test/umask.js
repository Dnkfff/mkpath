/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

import mkpath from '../mkpath.js';
import path from 'path';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('implicit mode from umask', function (t) {
    t.plan(2);
    const x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    let file = '/tmp/' + [x,y,z].join('/');
    
    mkpath(file, function (err) {
        if (err) t.fail(err);
        else _stat(file, function (err, stat) {
            if (err) t.fail(err)
            else {
                const newmask = 0o777;
                t.equal(stat.mode & 0o777, 0o777 & (~process.umask(newmask)));
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            }
        })
    });
});
