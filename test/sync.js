/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

import { sync } from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

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
        let cord = sync(file, 0755);
        console.log(typeof cord)
    } catch (err) {
        t.fail(err);
        return t.end();
    }

    _stat(file, function (err, stat) {
        if (err) t.fail(err)
        else {
            t.equal(stat.mode & 0777, 0755);
            t.ok(stat.isDirectory(), 'target not a directory');
            t.end();
        }
    });
});
