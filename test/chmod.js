import { dir } from 'console';
import mkpath from '../mkpath.js';
import { stat, unlinkSync, rmdirSync } from 'fs';
import fsPromises from 'fs/promises';
import { test } from 'tap';

let directory = `/tmp`;
let state = fsPromises.stat(directory);

test('chmod-pre', async t => {
  const mode = 0o744;
  
  t.ok(state.then(() => {
    let file = `tmp/${Math.random().toString(16).slice(4)}`.isDirectory(directory);
    console.log(file)
    console.log('This runs after the Promise has resolved');
  }))
})


// test('chmod-pre', async t => {
//    // Generate randomised unique path
//   const mode = 0o744;

//   //await mkpath(file, mode);
//   try {
//     const state = await stat(file);
//     t.ok(state.isDirectory(directory), 'should be directory');
//     t.equal(state.mode & 0o777, mode, 'should have correct mode');
//   } catch (err) {
//     t.fail('Catched error here - ', err);
//   }

//   cleanup();
// });

// test('chmod', async t => {
// // Generate unique path
//   const mode = 0o755;

//   //await mkpath(file, mode);

//   try {
//     const stat = await stat(file);
//     t.ok(stat.isDirectory(), 'should be directory');
//   } catch (err) {
//     t.fail('should not error', err);
//   }

//   cleanup();
// });

// test('existing non-directory', async t => {
//   // Generate unique path
//   //await mkpath(file);  // Create a file

//   try {
//     await mkpath(file);
//     t.fail('should error for existing non-directory');
//   } catch (err) {
//     t.equal(err.message, `${file} exists and is not a directory`);
//   }

//   cleanup();
// });

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
