import mkpath from '../mkpath.js';
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
                const actualPermissions = stat.mode & 0o777;  // Mask out non-permission bits
                t.equal(actualPermissions, 0o666, `Expected permissions to be 0o755 or 0o666, but got ${actualPermissions}`);
                t.ok(stat.isDirectory(), 'target is not a directory');
                t.end();
            }
        });
    });
});

test('async root perm', function (t) {
    mkpath('/tmp', 0o755, function (err) {
        if (err) t.fail(err);
        t.end();
    });
});
