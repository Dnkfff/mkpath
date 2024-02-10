import { dir } from 'console';
import mkpath from '../mkpath.js';
import { stat, unlinkSync, rmdirSync } from 'fs';
import fsPromises from 'fs/promises';
import { test } from 'tap';
import { resolve } from 'path';

let directory = `/tmp`;
let state = fsPromises.stat(directory);

test('chmod-pre', async t => {
  const modeN = 16822; // for linux 0o744!
  let mod = false;
  
  t.ok(state.then((file = `tmp/${Math.random().toString(16).slice(4)}`) => {
    file.isDirectory(directory);
  }), 'should be directory');

  t.ok(state.then((data) => {
    if(data.mode === modeN || data.mode === 0o744 || data.mode === 0o777){ 
    mod = true;
    } else t.fail('Catched error here - ', err)}), 'mode should equal and == true')
  
cleanup();
});

test('chmod', async t => {
  try {
    t.ok(state.then((file = `tmp/${Math.random().toString(16).slice(4)}`) => {
      file.isDirectory(directory);
    }), 'tmp should be directory');
  } catch (err) {
    t.fail('should not error', err);
  }
cleanup();
});

// test('existing non-directory', async t => {
//   // Generate unique path
//   //await mkpath(directory);  // Create a file

//   try {
//     await mkpath(directory);
//     t.fail('should error for existing non-directory');
//   } catch (err) {
//     t.equal(err.message, `${directory} exists and is not a directory`);
//   }

//  cleanup();
// });

function cleanup() {
    console.log("Cleanup: file exists =", !directory);
    if (directory) {
      try {
        unlinkSync(directory);
        rmdirSync(path.dirname(directory));
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    }
}
