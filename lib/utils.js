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
  const osType = os.type();
  switch (osType) {
    case 'Linux':
      return this.pbcopy(data);
    case 'Windows_NT':
      return this.windowsCopy(data);
    case 'Darwin':
      return this.pbcopy(data);
    default:
      throw 'Unsupported operating system';
  }
};
