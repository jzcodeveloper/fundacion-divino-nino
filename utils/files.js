const { readdir, rmdir, unlink, lstat } = require("fs").promises;
const { join } = require("path");

exports.rimraf = async function rimraf(path) {
  const stat = await lstat(path);
  if (!stat) return;

  const dir = await readdir(path);

  for (const file of dir) {
    const currPath = join(path, file);
    const stat = await lstat(currPath);
    if (stat.isDirectory()) await rimraf(currPath);
    else await unlink(currPath);
  }

  await rmdir(path);
};
