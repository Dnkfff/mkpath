// import { test } from 'tap';
// import mkpath from '../mkpath.js';
// import { stat as _stat } from 'fs';
// import path from 'path';

// // Fix for ES module: get __dirname and handle Windows paths correctly
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const baseDir = path.normalize(__dirname); // Normalize to handle Windows paths

// test('woo', function (t) {
//     t.plan(2); // Declare two assertions
    
//     // Generate random directories
//     let x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
//     let y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
//     let z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    
//     // Platform-independent path using the 'path' module
//     let file = path.join(baseDir, 'tmp', x, y, z);
    
//     // Ensure the parent directories exist
//     mkpath(file, 0o755, function (err) {
//         if (err) {
//             t.fail(`Error creating path: ${err}`);
//         } else {
//             // Check the mode after creating the directory
//             _stat(file, function (err, stat) {
//                 if (err) {
//                     t.fail(`Error reading stat for ${file}: ${err}`);
//                 } else {
//                     // Log the actual mode for debugging purposes
//                     console.log(`Actual mode: ${stat.mode.toString(8)}`);
                    
//                     // Check that the permissions are as expected (0o755)
//                     const permissions = stat.mode & 0o777; // Mask out non-permission bits
//                     t.equal(permissions, 0o755, `Expected permissions to be 0o755, but got ${permissions}`);
//                     t.ok(stat.isDirectory(), 'target is not a directory');
//                     t.end(); // Ensure the second assertion is run
//                 }
//             });
//         }
//     });
// });
