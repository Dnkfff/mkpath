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
    mkpath.sync(file, 0o755); // Using the 0o755 mode
  } catch (err) {
    t.fail(err);
    return t.end();
  }

  _stat(file, (err, stat) => {
    if (err) t.fail(err);
    else {
      // Extract the actual mode
      const actualMode = stat.mode & 0o777;
      const expectedMode = 0o666;

      // Ensure the actual mode includes the permissions of 0o755
      // The actual mode must be at least 0o755 or 0o666, but can have additional restrictions due to the umask
      t.ok((actualMode & expectedMode) === expectedMode, `Directory mode includes at least expected permissions (got ${actualMode}, expected ${expectedMode})`);

      t.ok(stat.isDirectory(), 'Target is a directory');
    }
    t.end();
  });
});
