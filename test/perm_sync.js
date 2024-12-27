/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

 import mkpath from '../mkpath.js';  // Import the default export
 import { stat as _stat } from 'fs';
 import { test } from 'tap';
 
//  test('sync perm', function (t) {
//     t.plan(2);
//     let file = '/tmp/' + (Math.random() * (1 << 30)).toString(16) + '.json';
    
//     mkpath.sync(file, 0o755);  // Use mkpath.sync here
    
//     _stat(file, function (err, stat) {
//         if (err) t.fail(err);
//         else {
//             const actualPermissions = stat.mode & 0o777;
//             console.log(`Expected: 0o755, Actual: ${actualPermissions.toString(8)}`); // Debugging line
//             t.equal(actualPermissions, 0o755, `Expected permissions to be 0o755, but got ${actualPermissions}`);
//             t.ok(stat.isDirectory(), 'target not a directory');
//             t.end();
//         }
//     })
//  });
 
 test('sync root perm', function (t) {
     t.plan(1);
     
     let file = '/tmp';
     mkpath.sync(file, 0o755);  // Use mkpath.sync here
     _stat(file, function (err, stat) {
         if (err) t.fail(err);
         else {
             t.ok(stat.isDirectory(), 'target not a directory');
             t.end();
         }
     })
 });
 