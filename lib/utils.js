const os = require('os');

exports.isWindows = () => os.type() === 'Windows_NT';

exports.isMac = () => os.type() === 'Darwin';

exports.isLinux = () => os.type() === 'Linux';

// Unfortunately we have to import like this
// because clipboardy is ESM and we're in CJS
exports.copyToClipboard = (text) => import('clipboardy').then((module) => module.default.write(text));
