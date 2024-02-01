/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

import mkpath from '../';
import { resolve } from 'path';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('root', function (t) {
    // '/' on unix, 'c:/' on windows.
    let file = resolve('/');

    mkpath(file, 0755, function (err) {
        if (err) throw err
        _stat(file, function (er, stat) {
            if (er) throw er
            t.ok(stat.isDirectory(), 'target is a directory');
            t.end();
        })
    });
});

