import { sync } from '../';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('umask sync modes', function (t) {
  t.plan(2); 

  const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
  const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
  const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);

  let file = '/tmp/' + [x, y, z].join('/');

  try {
    sync(file); 
  } catch (err) {
    t.fail(err);
    return t.end();
  }

  _stat(file, function (err, stat) {
    if (err) t.fail(err);
    else {
      const expectedMode = 0o777 & (~process.umask());
      t.equal(stat.mode & 0o777, expectedMode, 'Directory mode matches expected');
      t.ok(stat.isDirectory(), 'target not a directory');
    }
    t.end(); 
  });
});