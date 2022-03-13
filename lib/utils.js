const os = require('os');
const getIsWindows = () => os.type() === 'Windows_NT';
const getIsMac = () => os.type() === 'Darwin';
const getIsLinux = () => os.type() === 'Linux';

exports.getIsWindows = getIsWindows;

exports.getIsMac = getIsMac;

exports.getIsLinux = getIsLinux;

// Unfortunately we have to import like this
// because clipboardy is ESM and we're in CJS
exports.copyToClipboard = (text) => import('clipboardy').then((module) => module.default.write(text));
