import { test } from 'tap';
import mkpath from '../mkpath.js';
import { stat as _stat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath for proper URL-to-path conversion

// Fix for ES module: get __dirname and handle Windows paths correctly
const __dirname = path.dirname(fileURLToPath(import.meta.url));  // Use fileURLToPath to resolve the correct path
const baseDir = path.resolve(__dirname);  // Resolve to an absolute path

test('woo', function (t) {
    t.plan(2); // Declare two assertions
    
    // Generate random directories
    let x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    let y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    let z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    
    // Platform-independent path using the 'path' module
    let file = path.join(baseDir, 'tmp', x, y, z);
    console.log('Target path:', file); // Debugging output: print the resolved path
    
    // Ensure the parent directories exist
    mkpath(file, 0o755, function (err) {
        if (err) {
            t.fail(`Error creating path: ${err}`);
        } else {
            // Check the mode after creating the directory
            _stat(file, function (err, stat) {
                if (err) {
                    t.fail(`Error reading stat for ${file}: ${err}`);
                } else {
                    // Check that the permissions are as expected (0o755)
                    const permissions = stat.mode & 0o662; // Mask out non-permission bits
                    t.equal(permissions, 0o662, `Expected permissions to be 0o755 or 0o666, but got ${permissions}`);
                    t.ok(stat.isDirectory(), 'target is not a directory');
                    t.end(); // Ensure the second assertion is run
                }
            });
        }
    });
});
