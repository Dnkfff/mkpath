/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */
import mkpath from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

let ps = ['', 'tmp'];

for (let i = 0; i < 25; i++) {
    const dir = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    ps.push(dir);
}

let file = ps.join('/');

test('chmod-pre', function (t) {
    let mode = 0744;
    mkpath(file, mode, function (er) {
        t.ifError(er, 'should not error');
        _stat(file, function (er, stat) {
            t.ifError(er, 'should exist');
            t.ok(stat && stat.isDirectory(), 'should be directory');
            t.equal(stat && stat.mode & 0777, mode, 'should be 0o744');
            t.end();
        });
    });
});

test('chmod', function (t) {
    let mode = 0755;
    mkpath(file, mode, function (er) {
        t.ifError(er, 'should not error');
        _stat(file, function (er, stat) {
            t.ifError(er, 'should exist');
            t.ok(stat && stat.isDirectory(), 'should be directory');
            t.end();
        });
    });
});
