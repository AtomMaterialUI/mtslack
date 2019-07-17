const os = require('os');
const osType = os.type();
const homeDir = os.homedir();

const WIN_DIR = `${homeDir}\\AppData\\Local\\slack\\`;
const MAC_DIR = '/Applications/Slack\ Copy.app/Contents/Resources';
const LINUX_DIR = `/usr/lib/slack`;

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

const SLACK_RESOURCES_DIR = getDirectory();
const SLACK_FILE_PATH = `${SLACK_RESOURCES_DIR}/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/app.asar`;
const REPO = 'https://raw.githubusercontent.com/mallowigi/slack-one-dark-theme/master/dist/slack.min.css';


module.exports = {
  SLACK_FILE_PATH,
  SLACK_RESOURCES_DIR,
  SLACK_ARCHIVE,
  REPO,
};