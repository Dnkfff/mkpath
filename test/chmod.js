import mkpath from '../mkpath.js';
import { stat, unlinkSync, rmdirSync } from 'fs';
import { test } from 'tap';

let file;

test('chmod-pre', async t => {
  file = `tmp/${Math.random().toString(16).slice(2)}`;  // Generate randomised unique path
  const mode = 0o744;

  await mkpath(file, mode);

  try {
    const stat = await stat(file);
    console.log(stat)
    t.ok(stat.isDirectory(file), 'should be directory');
    t.equal(stat.mode & 0o777, mode, 'should have correct mode');
  } catch (err) {
    t.fail('should not error', err);
  }

  cleanup();
});

test('chmod', async t => {
  file = `tmp/${Math.random().toString(16).slice(2)}`;  // Generate unique path
  const mode = 0o755;

  await mkpath(file, mode);

  try {
    const stat = await stat(file);
    t.ok(stat.isDirectory(), 'should be directory');
  } catch (err) {
    t.fail('should not error', err);
  }

  cleanup();
});

test('existing non-directory', async t => {
  file = `tmp/${Math.random().toString(16).slice(2)}`;  // Generate unique path
  await mkpath(file);  // Create a file

  try {
    await mkpath(file);
    t.fail('should error for existing non-directory');
  } catch (err) {
    t.equal(err.message, `${file} exists and is not a directory`);
  }

  cleanup();
});

 function cleanup() {
    console.log("Cleanup: file exists =", !!file);
    if (file) {
      try {
        unlinkSync(file);
        rmdirSync(path.dirname(file));
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    }
  }
