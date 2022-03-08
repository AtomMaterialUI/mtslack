const os = require('os');
exports.pbcopy = (data) => {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
};

exports.windowsCopy = (data) => {
  require('child_process').spawn('clip').stdin.end(data);
};

exports.copyToClipboard = (data) => {
  if (getIsWindows()) return this.windowsCopy(data);
  if (getIsMac()) return this.pbcopy(data);
  if (getIsLinux()) return this.pbcopy(data);

  throw Error('Unsupported operating system');
};

const getIsWindows = () => os.type() === 'Windows_NT';
const getIsMac = () => os.type() === 'Darwin';
const getIsLinux = () => os.type() === 'Linux';
exports.getIsWindows = getIsWindows;
exports.getIsMac = getIsMac;
exports.getIsLinux = getIsLinux;
