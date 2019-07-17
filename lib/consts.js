const os = require('os');
const osType = os.type();
const homeDir = os.homedir();

const WIN_DIR = `${homeDir}\\AppData\\Local\\slack\\app-4.0.0\\resources`;
const MAC_DIR = '/Applications/Slack.app/Contents/Resources';
const LINUX_DIR = `/usr/lib/slack/resources`;

const WIN_PATH = `/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const MAC_PATH = `/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const LINUX_PATH = `/app.asar.unpacked/src/static/ssb-interop.js`;

function getDirectory() {
  switch (osType) {
    case 'Linux':
      return LINUX_DIR;
    case 'Windows_NT':
      return WIN_DIR;
    case 'Darwin':
      return MAC_DIR;
    default:
      return MAC_DIR;
  }
}

function getFilePath(prefix) {
  switch (osType) {
    case 'Linux':
      return prefix + LINUX_PATH;
    case 'Windows_NT':
      return prefix + WIN_PATH;
    case 'Darwin':
      return prefix + MAC_PATH;
    default:
      return prefix + MAC_PATH;
  }
}

const SLACK_RESOURCES_DIR = getDirectory();
const SLACK_FILE_PATH = getFilePath(SLACK_RESOURCES_DIR);
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/app.asar`;
const REPO = 'https://raw.githubusercontent.com/mallowigi/slack-one-dark-theme/master/dist/slack.min.css';

module.exports = {
  SLACK_FILE_PATH,
  SLACK_RESOURCES_DIR,
  SLACK_ARCHIVE,
  REPO,
};