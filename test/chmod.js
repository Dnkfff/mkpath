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
    //console.log(file)
  }));

  t.ok(state.then((data) => {if(data.mode === modeN || data.mode === 0o744 || data.mode === 0o777){ 
    mod = true;
    }else t.fail('Catched error here - ', err)}));
    cleanup();
});


// test('chmod-pre', async t => {
//    // Generate randomised unique path
//   const mode = 0o744;

//   //await mkpath(file, mode);
//   try {
//     const state = await stat(file);
//     t.ok(state.isDirectory(directory), 'should be directory');
//     t.equal(state.mode & 0o777, mode, 'should have correct mode');
//   } catch (err) {
//     
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
