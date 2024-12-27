import mkpath from '../mkpath.js';
import { stat, unlinkSync, rmdirSync, existsSync } from 'fs';
import fsPromises from 'fs/promises';
import { test } from 'tap';
import { resolve, dirname } from 'path';
const { existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');


let directory = `./tmp`;  // Relative path; can also use an absolute path
let nonDirectoryPath = `./tmp/non-directory-file`;
let state;

test('setup', t => {
  // Ensure that the 'tmp' directory exists before running tests
  if (!existsSync(directory)) {
    fsPromises.mkdir(directory, { recursive: true })
      .then(() => t.pass('Directory created'))
      .catch(err => t.fail(`Failed to create directory: ${err.message}`));
  } else {
    t.pass('Directory already exists');
  }
  t.end();
});

test('chmod-pre', async t => {
  const modeN = 16822; // for linux 0o744!
  let mod = false;

  try {
    state = await fsPromises.stat(directory);
    t.ok(state.isDirectory(), 'should be directory');
    if (state.mode === modeN || state.mode === 0o744 || state.mode === 0o777) {
      mod = true;
    } else {
      t.fail('Mode mismatch error');
    }
  } catch (err) {
    t.fail('Error fetching directory stats:', err);
  }

  t.end();
});

test('chmod', async t => {
  try {
    state = await fsPromises.stat(directory);
    t.ok(state.isDirectory(), 'tmp should be directory');
  } catch (err) {
    t.fail('should not error', err);
  }

  t.end();
});

test('existing non-directory', async t => {
  const nonDirectoryPath = `./tmp/non-directory-file`;

  try {
    // Ensure cleanup before the test
    if (existsSync(nonDirectoryPath)) {
      console.log(`Cleaning up: Removing existing file at ${nonDirectoryPath}`);
      unlinkSync(nonDirectoryPath);  // Ensure the file doesn't exist before test
    }

    // Create a non-directory file
    console.log(`Creating non-directory file at ${nonDirectoryPath}`);
    await fsPromises.writeFile(nonDirectoryPath, 'Test content');
    
    // Double-check if the file was created
    if (existsSync(nonDirectoryPath)) {
      console.log(`Successfully created non-directory file at ${nonDirectoryPath}`);
    } else {
      t.fail('File creation failed');
    }

    // Attempt to create a directory where the non-directory file exists
    console.log('Attempting to create a directory at the path where a file exists...');
    await mkpath(nonDirectoryPath);  // This should throw an error
    t.fail('should error for existing non-directory');  // This should not be reached
  } catch (err) {
    console.log(`Caught error: ${err.message}`);

    // Ensure the error message matches the expected one
    t.equal(err.message, `${nonDirectoryPath} exists and is not a directory`, 'Error message should match');
  }
  // Cleanup
  cleanup();
  t.end();
});

// function cleanup() {
//   console.log("Cleanup: Checking if file exists...");
//   const nonDirectoryPath = `./tmp/non-directory-file`;
//   if (existsSync(nonDirectoryPath)) {
//     try {
//       console.log(`Cleaning up: Removing file at ${nonDirectoryPath}`);
//       unlinkSync(nonDirectoryPath);
//     } catch (err) {
//       console.error('Error during cleanup:', err);
//     }
//   }
// }


function cleanup() {
  console.log("Cleanup: file exists =", existsSync(nonDirectoryPath));
  if (existsSync(nonDirectoryPath)) {
    try {
      unlinkSync(nonDirectoryPath); // Clean up the non-directory file
      console.log(`Cleaned up: ${nonDirectoryPath}`);
    } catch (err) {
      console.error('Error during cleanup:', err);
    }
  }
  // Cleanup the tmp directory if necessary
  if (existsSync(directory)) {
    try {
      rmdirSync(directory); // Clean up the tmp directory
    } catch (err) {
      console.error('Error during cleanup of tmp:', err);
    }
  }
}
