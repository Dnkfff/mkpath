// import mkpath from '../mkpath.js';
// import { existsSync } from 'fs';
// import fsPromises from 'fs/promises';
// import { test } from 'tap';


// let directory = `./tmp`;  // Relative path; can also use an absolute path
// let state;

// test('setup', t => {
//   // Ensure that the 'tmp' directory exists before running tests
//   if (!existsSync(directory)) {
//     fsPromises.mkdir(directory, { recursive: true })
//       .then(() => t.pass('Directory created'))
//       .catch(err => t.fail(`Failed to create directory: ${err.message}`));
//   } else {
//     t.pass('Directory already exists');
//   }
//   t.end();
// });

// test('chmod-pre', async t => {
//   const modeN = 16822; // for linux 0o744!
//   let mod = false;

//   try {
//     state = await fsPromises.stat(directory);
//     t.ok(state.isDirectory(), 'should be directory');
//     if (state.mode === modeN || state.mode === 0o744 || state.mode === 0o777) {
//       mod = true;
//     } else {
//       t.fail('Mode mismatch error');
//     }
//   } catch (err) {
//     t.fail('Error fetching directory stats:', err);
//   }

//   t.end();
// });

// test('chmod', async t => {
//   try {
//     state = await fsPromises.stat(directory);
//     t.ok(state.isDirectory(), 'tmp should be directory');
//   } catch (err) {
//     t.fail('should not error', err);
//   }

//   t.end();
// });
