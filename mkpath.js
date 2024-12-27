import fs from 'fs';
import path from 'path';

// Calculate the default mode using process.umask()
const defaultMode = 0o777 & ~process.umask();
console.log('Default Mode:', defaultMode); // Debugging output

const mkpath = (dirpath, mode = defaultMode, callback) => {
  dirpath = path.resolve(dirpath);

  if (!callback) callback = () => {};

  // Ensure mode is always a number
  if (typeof mode !== 'number') {
    console.error('Invalid mode type:', typeof mode, mode); // Debugging output
    throw new TypeError(`The "mode" property must be a number. Received ${typeof mode}`);
  }

  fs.stat(dirpath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        mkpath(path.dirname(dirpath), mode, (err) => {
          if (err) {
            callback(err);
          } else {
            console.log('Creating directory with mode:', mode); // Debugging output
            fs.mkdir(dirpath, { mode, recursive: true }, (err) => {
              if (err) {
                callback(err);
              } else {
                // Ensure the permissions are exactly what we want
                fs.chmod(dirpath, mode, callback);
              }
            });
          }
        });
      } else {
        callback(err);
      }
    } else if (stats.isDirectory()) {
      callback(null);
    } else {
      callback(new Error(`${dirpath} exists and is not a directory`));
    }
  });
};

mkpath.sync = (dirpath, mode = defaultMode) => {
  dirpath = path.resolve(dirpath);

  // Ensure mode is always a number
  if (typeof mode !== 'number') {
    console.error('Invalid mode type:', typeof mode, mode); // Debugging output
    throw new TypeError(`The "mode" property must be a number. Received ${typeof mode}`);
  }

  try {
    console.log('Creating directory (sync) with mode:', mode); // Debugging output
    fs.mkdirSync(dirpath, { mode, recursive: true });
    // Ensure the permissions are exactly what we want
    fs.chmodSync(dirpath, mode);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
    const stats = fs.statSync(dirpath);
    if (!stats.isDirectory()) {
      throw new Error(`${dirpath} exists and is not a directory`);
    }
  }
};

export default mkpath;
