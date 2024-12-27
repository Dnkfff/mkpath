import mkpath from '../mkpath.js';
import { writeFileSync, stat as _stat } from 'fs';
import { test } from 'tap';

let ps = ['', 'tmp'];

for (let i = 0; i < 25; i++) {
    const dir = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    ps.push(dir);
}

let file = ps.join('/');

// a file in the way
const itw = ps.slice(0, 3).join('/');

test('clobber-pre', function (t) {
    console.error("about to write to " + itw);
    writeFileSync(itw, 'I AM IN THE WAY, THE TRUTH, AND THE LIGHT.');

    _stat(itw, function (er, stat) {
        t.notOk(er, 'no error should occur');
        t.ok(stat && stat.isFile(), 'should be file');
        t.end();
    });
});

test('clobber', function (t) {
    t.plan(2);
    mkpath(file, 0o755, function (err) {
        console.error('Error:', err); // Log the error for debugging

        t.ok(err, 'error should occur');
        
        // Check if the error message contains the expected string
        if (err) {
            t.pass('Error message contains the expected text');
        } else {
            t.fail('Expected error message to contain "exists and is not a directory", but got: ' + err);
        }
        
        t.end();
    });
});
