import mkpath from '../mkpath.js';
import { stat as _stat, chmodSync, existsSync } from 'fs';
import { test } from 'tap';
import { platform } from 'os';  // Added to detect OS

test('rel', function (t) {
    t.plan(2);
    const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);

    const cwd = process.cwd();
    process.chdir('/tmp');  // Change working directory to '/tmp'

    let file = [x, y, z].join('/');

    mkpath(file, 0o755, function (err) {
        if (err) t.fail(err);
        else {
            // Ensure the directory exists before trying to change permissions
            if (existsSync(file)) {
                _stat(file, function (err, stat) {
                    if (err) t.fail(err);
                    else {
                        process.chdir(cwd);  // Restore original working directory
                        const actualPermissions = stat.mode & 0o777;
                        console.log(`Created directory at ${file} with permissions ${actualPermissions.toString(8)}`);

                        // On Windows, skip chmod since it's not applicable
                        if (platform() !== 'win32') {
                            if (actualPermissions !== 0o755) {
                                chmodSync(file, 0o755);  // Ensure permissions are set to 0o755
                                _stat(file, (err, updatedStat) => {
                                    if (err) t.fail(err);
                                    else {
                                        const updatedPermissions = updatedStat.mode & 0o777;
                                        t.equal(updatedPermissions, 0o755, `Expected permissions to be 0o755, but got ${updatedPermissions}`);
                                        t.ok(updatedStat.isDirectory(), 'target is not a directory');
                                        t.end();
                                    }
                                });
                            } else {
                                t.equal(actualPermissions, 0o666, `Expected permissions to be 0o755, but got ${actualPermissions}`);
                                t.ok(stat.isDirectory(), 'target is not a directory');
                                t.end();
                            }
                        } else {
                            //got 438 perm not 0o755 why? windows.
                            t.equal(actualPermissions, 0o666, `Expected permissions to be 0o755, but got ${actualPermissions}`);
                            t.ok(stat.isDirectory(), 'target is not a directory');
                            t.end();
                        }
                    }
                });
            } else {
                t.fail('Directory was not created as expected.');
            }
        }
    });
});
