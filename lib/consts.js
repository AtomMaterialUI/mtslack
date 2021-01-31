const fs = require('fs');
const os = require('os');
const osType = os.type();
const homeDir = os.homedir();

const ARCH = process.arch;
const MAC_DIR = '/Applications/Slack.app/Contents/Resources';
const LINUX_DIR = `/usr/lib/slack/resources`;
const ASAR = `app.asar`
const ASAR_ARCH = `app-${ARCH}.asar`
const EXTRACT_PATH = `/${ASAR}.unpacked/dist/`;
const EXTRACT_PATH_ARCH = `/${ASAR_ARCH}.unpacked/dist/`;

function getWindowsDirectory() {
  const minorVersionMax = 99;
  const patchVersionMax = 99;
  for (let i = minorVersionMax; i >= 0; --i) {
    for (let j = patchVersionMax; j >= 0; --j) {
      const ver = `4.${i}.${j}`;

      const dir = `${homeDir}\\AppData\\Local\\slack\\app-${ver}\\resources`;
      if (fs.existsSync(dir)) {
        return dir;
      }

      const globalScoopDir = `${process.env.ProgramData}\\scoop\\apps\\slack\\${ver}\\resources`;
      if (fs.existsSync(globalScoopDir)) {
        return globalScoopDir;
      }

      const localScoopDir = `${homeDir}\\scoop\\apps\\slack\\${ver}\\resources`;
      if (fs.existsSync(localScoopDir)) {
        return localScoopDir;
      }

      for (let k = 9; k >= 0; --k) {
        const betaDir = `${homeDir}\\AppData\\Local\\slack\\app-${ver}-beta${k}\\resources`;
        if (fs.existsSync(betaDir)) {
          return betaDir;
        }
      }
    }
  }
  throw Error('Could not find Windows directory');
}

function getDirectory() {
  switch (osType) {
    case 'Linux':
      return LINUX_DIR;
    case 'Windows_NT':
      return getWindowsDirectory();
    case 'Darwin':
      return MAC_DIR;
    default:
      return MAC_DIR;
  }
}

function getDistPath(prefix) {
  return prefix + EXTRACT_PATH;
}

function getDistPathArch(prefix) {
  return prefix + EXTRACT_PATH_ARCH;
}

const SLACK_RESOURCES_DIR = getDirectory();
const SLACK_FILE_PATH = getDistPath(SLACK_RESOURCES_DIR);
const SLACK_FILE_PATH_ARCH = getDistPathArch(SLACK_RESOURCES_DIR);
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/${ASAR}`;
const SLACK_ARCHIVE_ARCH = `${SLACK_RESOURCES_DIR}/${ASAR_ARCH}`;

const REPO = process.env.LOCALHOST
  ? 'http://localhost:8080/dist/slack.css'
  : `https://raw.githubusercontent.com/mallowigi/mtslack/master/dist/slack.min.css?cacheBuster=${Date.now()}`;

module.exports = {
  ARCH,
  ASAR,
  ASAR_ARCH,
  SLACK_FILE_PATH,
  SLACK_FILE_PATH_ARCH,
  SLACK_RESOURCES_DIR,
  SLACK_ARCHIVE,
  SLACK_ARCHIVE_ARCH,
  REPO
};
