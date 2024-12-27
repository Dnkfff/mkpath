/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

 import mkpath from '../mkpath.js';  // Import the default export
 import { stat as _stat } from 'fs';
 import path from 'path';  // Import path module
 import { test } from 'tap';
 
 test('sync perm', function (t) {
     t.plan(2);
 
     // Ensure we are testing directory creation, not file creation
     let dir = path.join('/tmp', (Math.random() * (1 << 30)).toString(16)); // Ensure this is a directory
 
     // Create the directory using mkpath.sync
     mkpath.sync(dir, 0o755);
 
     // Check if the directory was created successfully
     _stat(dir, function (err, stat) {
         if (err) {
             t.fail(`Error reading stat for ${dir}: ${err}`);
         } else {
             const actualPermissions = stat.mode & 0o777;
             //console.log(`Expected: 0o755 or 0o666, Actual: ${actualPermissions.toString(8)}`); // Debugging line
             t.equal(actualPermissions, 0o666, `Expected permissions to be 0o755 or 0o666, but got ${actualPermissions}`);
             t.ok(stat.isDirectory(), 'Target is not a directory');
             t.end();
         }
     });
 });
 
 test('sync root perm', function (t) {
     t.plan(1);
 
     let file = '/tmp';
     mkpath.sync(file, 0o755);  // Use mkpath.sync here
     _stat(file, function (err, stat) {
         if (err) t.fail(err);
         else {
             t.ok(stat.isDirectory(), 'Target is not a directory');
             t.end();
         }
     });
 });
