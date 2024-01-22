import fs from 'fs';
import path from 'path';
/* The signature '(): number' of 'process.umask' is deprecated.ts(6387) */
const defaultMode = parseInt('0777', 8) & (~process.umask());

const mkpath = (dirpath, mode = defaultMode, callback) => {
  dirpath = path.resolve(dirpath);

  if (!callback) callback = () => {};

  fs.stat(dirpath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        mkpath(path.dirname(dirpath), mode, (err) => {
          if (err) callback(err);
          else {
            fs.mkdir(dirpath, mode, callback);
          }
        });
      } else callback(err);
    } else if (stats.isDirectory()) callback(null);
    else callback(new Error(`${dirpath} exists and is not a directory`));
  });
};

mkpath.sync = (dirpath, mode = defaultMode) => {
  dirpath = path.resolve(dirpath);

  try {
    if (!fs.statSync(dirpath).isDirectory()) {
      throw new Error(`${dirpath} exists and is not a directory`);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      mkpath.sync(path.dirname(dirpath), mode);
      fs.mkdirSync(dirpath, mode);
    } else throw err;
  }
};

export default mkpath;
