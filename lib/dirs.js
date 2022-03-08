const fs = require('fs');
const os = require('os');
const { getIsLinux, getIsMac, getIsWindows } = require('./utils');
const homeDir = os.homedir();

const getLinuxAppDir = () => {
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
};

const getWindowsAppDir = () => {
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
};

const getMacAppDir = () => {
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
};

exports.getDefaultLocation = () => {
  if (getIsLinux()) return `/usr/lib/slack`;
  if (getIsMac()) return `/Applications/Slack.app`;
  if (getIsWindows()) return `${homeDir}\\AppData\\Local\\slack\\app-xxx`;
  throw Error('Unsupported operating system');
};

exports.getAppLocation = ({ customLocation }) => {
  if (customLocation) {
    const dir = `${customLocation}`;
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  if (getIsWindows()) return getWindowsAppDir();
  if (getIsMac()) return getMacAppDir();
  if (getIsLinux()) return getLinuxAppDir();

  throw Error('Unsupported operating system');
};

exports.getResourcesDir = () => {
  if (getIsWindows()) return `\\resources\\`;
  if (getIsMac()) return `/Contents/Resources/`;
  if (getIsLinux()) return `/resources/`;

  throw Error('Unsupported operating system');
};

exports.findArchive = (resourcesDir) => {
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
};
