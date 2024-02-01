/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */
import mkpath from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('woo', function (t) {
    t.plan(2);
    let x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    let y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    let z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    let file = '/tmp/' + [x,y,z].join('/');
    
    mkpath(file, 0755, function (err) {
        if (err) t.fail(err);
        else _stat(file, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0755);
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            }
        })
    });
});
