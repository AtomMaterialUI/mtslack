import fs from 'fs';
import os from 'os';
import { isLinux, isMac, isWindows } from './utils.js';

const osType = os.type();
const homeDir = os.homedir();

function getLinuxAppDir() {
  const snapDir = `/snap/slack/23/usr/lib/slack/`;
  if (fs.existsSync(snapDir)) {
    return snapDir;
  }

  const appDir = `/usr/lib/slack`;
  if (fs.existsSync(appDir)) {
    return appDir;
  }

  throw `Linux: Could not find Slack app in the following locations:
  ⚡️ ${snapDir}
  ⚡️ ${appDir}
`;
}

function getWindowsAppDir() {
  const minorVersionMax = 99;
  const patchVersionMax = 99;
  let dir, globalScoopDir, localScoopDir, betaDir;

  for (let i = minorVersionMax; i >= 0; --i) {
    for (let j = patchVersionMax; j >= 0; --j) {
      const ver = `4.${i}.${j}`;

      dir = `${homeDir}\\AppData\\Local\\slack\\app-${ver}`;
      if (fs.existsSync(dir)) {
        return dir;
      }

      globalScoopDir = `${process.env.ProgramData}\\scoop\\apps\\slack\\${ver}`;
      if (fs.existsSync(globalScoopDir)) {
        return globalScoopDir;
      }

      localScoopDir = `${homeDir}\\scoop\\apps\\slack\\${ver}`;
      if (fs.existsSync(localScoopDir)) {
        return localScoopDir;
      }

      for (let k = 9; k >= 0; --k) {
        betaDir = `${homeDir}\\AppData\\Local\\slack\\app-${ver}-beta${k}`;
        if (fs.existsSync(betaDir)) {
          return betaDir;
        }
      }
    }
  }

  throw `Windows: Could not find Slack app in the following locations:
  ⚡️ ${dir}
  ⚡️ ${globalScoopDir}
  ⚡️ ${localScoopDir}
  ⚡️ ${betaDir}
`;
}

function getMacAppDir() {
  const userDir = `${homeDir}/Applications/Slack.app`;
  if (fs.existsSync(userDir)) {
    return userDir;
  }

  const dir = `/Applications/Slack.app`;
  if (fs.existsSync(dir)) {
    return dir;
  }

  throw `Mac: Could not find Slack app in the following locations:
  ⚡️ ${userDir}
  ⚡️ ${dir}
`;
}

export function getDefaultLocation() {
  if (isLinux()) {
    return `/usr/lib/slack`;
  } else if (isMac()) {
    return `/Applications/Slack.app`;
  } else if (isWindows()) {
    return `${homeDir}\\AppData\\Local\\slack\\app-xxx`;
  }
  throw Error('Unsupported operating system');
}

export function getAppLocation({ customLocation }) {
  if (customLocation) {
    const dir = `${customLocation}`;
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  if (isWindows()) {
    return getWindowsAppDir();
  } else if (isMac()) {
    return getMacAppDir();
  } else if (isLinux()) {
    return getLinuxAppDir();
  }

  throw Error('Unsupported operating system');
}

export function getResourcesDir() {
  if (isWindows()) {
    return `\\resources\\`;
  } else if (isMac()) {
    return `/Contents/Resources/`;
  } else if (isLinux()) {
    return `/resources/`;
  }

  throw Error('Unsupported operating system');
}

export function findArchive(resourcesDir) {
  if (!fs.existsSync(resourcesDir)) {
    throw 'Could not find the resources directory';
  }
  // First try to find the x64 archive
  const arch = process.arch;
  const asar = `app.asar`;
  const asarArch = `app-${arch}.asar`;

  const fullPath = `${resourcesDir}${asar}`;
  const fullPathArch = `${resourcesDir}${asarArch}`;

  if (fs.existsSync(fullPathArch)) {
    return fullPathArch;
  } else if (fs.existsSync(fullPath)) {
    return fullPath;
  } else {
    throw 'Could not find Slack archive';
  }
}
