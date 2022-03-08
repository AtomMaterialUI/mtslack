// Unfortunately we have to import like this
// because clipboardy is ESM and we're in CJS
exports.copyToClipboard = (text) => import('clipboardy').then((module) => module.default.write(text));
