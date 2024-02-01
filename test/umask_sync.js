/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

import { sync } from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('umask sync modes', function (t) {
    t.plan(2);
    const x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);

    let file = '/tmp/' + [x,y,z].join('/');

    try {
        sync(file);
    } catch (err) {
        t.fail(err);
        return t.end();
    }

    _stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            /* The signature '(): number' of 'process.umask' is deprecated.ts(6387)
               process.d.ts(1296, 20): The declaration was marked as deprecated here. */
            t.equal(stat.mode & 0777, (0777 & (~process.umask())));
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    });
});

