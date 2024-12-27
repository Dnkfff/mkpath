import mkpath from '../mkpath.js';
import path from 'path';
import { stat as _stat, mkdirSync } from 'fs';
import { test } from 'tap';

test('implicit mode from umask', (t) => {
  t.plan(2);

  const tmpDir = path.join(process.platform === 'win32' ? 'C:\\tmp' : '/tmp');
  mkdirSync(tmpDir, { recursive: true });

  const x = Math.floor(Math.random() * 0x10000).toString(16);
  const y = Math.floor(Math.random() * 0x10000).toString(16);
  const z = Math.floor(Math.random() * 0x10000).toString(16);

  const file = path.join(tmpDir, x, y, z);

  const mode = 0o777 & (~process.umask());
  console.log("Mode being passed to mkpath:", mode, typeof mode); // Debugging output

  mkpath(file, mode, (err) => {
    if (err) {
      t.fail(`Failed to create directory: ${err.message}`);
      t.ok(false, 'Skipping remaining checks due to error');
      return;
    }
    console.log(`Directory successfully created: ${file}`);

    setTimeout(() => {
      _stat(file, (err, stat) => {
        if (err) {
          t.fail(`Failed to stat directory: ${err.message}`);
          t.ok(false, 'Skipping remaining checks due to error');
          return;
        }
        
        // Compare expected mode with actual mode, considering umask
        const expectedMode = 0o666 & (~process.umask());
        console.log(`Expected mode: ${expectedMode}, Actual mode: ${stat.mode & 0o777}`); // Debugging output
        
        t.equal(stat.mode & 0o777, expectedMode, 'Directory mode matches expected');
        t.ok(stat.isDirectory(), 'Target is a directory');
      });
    }, 100);
  });
});
