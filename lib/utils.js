import os from 'os';
import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';
import { fileURLToPath } from 'url';

export const getDirName = () => path.dirname(fileURLToPath(import.meta.url));

export const getRootName = () => path.join(getDirName(), '..');

export const isWindows = () => os.type() === 'Windows_NT';

export const isMac = () => os.type() === 'Darwin';

export const isLinux = () => os.type() === 'Linux';

// Unfortunately we have to import like this
// because clipboardy is ESM and we're in CJS
export const copyToClipboard = (text) => clipboardy.write(text);

export const getPackageJson = () =>
  JSON.parse(fs.readFileSync(path.join(getRootName(), 'package.json')).toString('utf-8'));
