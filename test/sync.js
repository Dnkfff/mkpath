import mkpath from '../mkpath.js';
import { stat as _stat } from 'fs';
import { test } from 'tap';

test('sync', (t) => {
  t.plan(2);
  const x = Math.floor(Math.random() * 0x10000).toString(16);
  const y = Math.floor(Math.random() * 0x10000).toString(16);
  const z = Math.floor(Math.random() * 0x10000).toString(16);

  const file = `/tmp/${x}/${y}/${z}`;

  try {
    mkpath.sync(file, 0o755);
  } catch (err) {
    t.fail(err);
    return t.end();
  }

  _stat(file, (err, stat) => {
    if (err) t.fail(err);
    else {
      t.equal(stat.mode & 0o777, 0o755);
      t.ok(stat.isDirectory(), 'Target is a directory');
    }
    t.end();
  });
});
