import os from 'os';
import { spawn } from 'node:child_process';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getDirName = () => path.dirname(fileURLToPath(import.meta.url));
export const getRootName = () => path.join(getDirName(), '..');

export const getPackageJson = () =>
  JSON.parse(fs.readFileSync(path.join(getRootName(), 'package.json')).toString('utf-8'));

export const pbcopy = (data) => {
  const proc = spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
};

export const windowsCopy = (data) => spawn('clip').stdin.end(data);

const copyHandlers = {
  Linux: pbcopy,
  Windows_NT: windowsCopy,
  Darwin: pbcopy,
};
export function copyToClipboard(data) {
  const osType = os.type();
  if (!(osType in copyHandlers)) throw Error('Unsupported operating system');

  copyHandlers[osType](data);
}
