import asar from '@mallowigi/asar';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import chalk from 'chalk';

import themes from './themes.js';
import * as cli from './cli.js';
import { bottomBar, loader } from './loader.js';

import { copyToClipboard as internalCopyToClipboard, getDirName, getPackageJson } from './utils.js';
import { REPO } from './consts.js';
import { findArchive, getAppLocation, getResourcesDir } from './dirs.js';

const plugins = fs.readFileSync(path.join(getDirName(), '../dist/plugins.js'));
const packageJson = getPackageJson();

// The JS we want to inject
const generateJS = () => {
  // language=JavaScript
  return `

    // Preload themes in the app
    window.themePresets = ${JSON.stringify(themes.getThemesCSS())};

    const event = new CustomEvent('ThemeChanged', {
      detail: {
        name: 'oceanic', css: \`
   ${themes.getThemeCSS()}
   \`
      }
    });

    document.addEventListener('DOMContentLoaded', function () {
      // Fetch our CSS in parallel ahead of time
      const cssPath = '${REPO}';
      let s = document.getElementById('slackCustomCss');
      if (s) {
        s.remove();
      }
      let cssPromise = fetch(cssPath).then((response) => response.text());

      // Insert a style tag into the wrapper view
      cssPromise.then((css) => {
        let s = document.createElement('style');
        s.type = 'text/css';
        s.innerHTML = css;
        s.id = 'slackCustomCss';
        document.head.appendChild(s);
      });

      // Plugins
      ${plugins};

      document.body.parentElement.id = 'mtslack';

      if (document.title === 'Server Error | Slack' || document.title === 'Slack System Status') {
        document.body.style.backgroundColor = 'var(--bg)';
      }
    });

    document.addEventListener('ThemeChanged', function (e) {
      const css = e.detail.css;
      const name = e.detail.name;
      let s = document.getElementById('slackCustomStyle');
      if (s) {
        s.remove();
      }
      document.body.classList.remove('mtslack');
      document.body.parentElement.id = '';

      if (!name || name === 'default') {
        return;
      }
      s = document.createElement('style');
      s.type = 'text/css';
      s.innerHTML = css;
      s.id = 'slackCustomStyle';
      document.head.appendChild(s);
      document.body.classList.add('mtslack', 'mtslack--' + name);
      document.body.parentElement.id = 'mtslack';
    });

    document.addEventListener('AccentChanged', function (e) {
      const customAccent = e.detail;
      let s = document.getElementById('slackCustomAccent');
      if (s) {
        s.remove();
      }

      s = document.createElement('style');
      s.type = 'text/css';
      s.id = 'slackCustomAccent';
      s.innerHTML = \`:root { --accent: \${customAccent}; --accentT: \${customAccent}; }\`;
      document.head.appendChild(s);
    });

    document.addEventListener('AccentReset', function (e) {
      let s = document.getElementById('slackCustomAccent');
      if (s) {
        s.remove();
      }
    });

    document.addEventListener('LinksChanged', function (e) {
      const customLinks = e.detail;
      let s = document.getElementById('slackCustomLinks');
      if (s) {
        s.remove();
      }

      s = document.createElement('style');
      s.type = 'text/css';
      s.id = 'slackCustomLinks';
      s.innerHTML = \`:root { --accent2: \${customLinks}; --accent2T: \${customLinks}; }\`;
      document.head.appendChild(s);
    });

    document.addEventListener('LinksReset', function (e) {
      let s = document.getElementById('slackCustomLinks');
      if (s) {
        s.remove();
      }
    });

    document.addEventListener('MainFontChanged', function (e) {
      const font = e.detail;
      let s = document.getElementById('slackCustomMainFont');
      if (s) {
        s.remove();
      }

      s = document.createElement('style');
      s.type = 'text/css';
      s.id = 'slackCustomMainFont';
      s.innerHTML = \`:root { --fontFamily: \${font}; }\`;
      document.head.appendChild(s);
    });

    document.addEventListener('MainFontReset', function (e) {
      let s = document.getElementById('slackCustomMainFont');
      if (s) {
        s.remove();
      }
    });

    document.addEventListener('MonoFontChanged', function (e) {
      const font = e.detail;
      let s = document.getElementById('slackCustomMonoFont');
      if (s) {
        s.remove();
      }

      s = document.createElement('style');
      s.type = 'text/css';
      s.id = 'slackCustomMonoFont';
      s.innerHTML = \`:root { --monoFont: \${font}; }\`;
      document.head.appendChild(s);
    });

    document.addEventListener('MonoFontReset', function (e) {
      let s = document.getElementById('slackCustomMonoFont');
      if (s) {
        s.remove();
      }
    });

    document.dispatchEvent(new CustomEvent('DOMContentLoaded'));

  `;
};

/**
 * Find the asar file
 * @returns {Promise<string>}
 */
async function findAsar() {
  // First verify the app location
  const { location: customLocation } = await cli.askLocation();

  const slackApp = getAppLocation({ customLocation });
  if (!fs.existsSync(slackApp)) {
    throw 'Could not find Slack app directory';
  }
  // Next verify the resources dir
  const resourcesDir = `${slackApp}${getResourcesDir()}`;

  // Next verify the asar location
  return findArchive(resourcesDir);
}

async function findApp() {
  const { location: customLocation } = await cli.askLocation();
  const slackApp = getAppLocation({ customLocation });
  if (!fs.existsSync(slackApp)) {
    throw 'Could not find Slack app directory';
  }
  return slackApp;
}

/**
 * Apply the tweaking
 * @returns {*}
 */
export async function apply(archive) {
  // Apply theme first
  themes.changeTheme('oceanic');

  // Make a backup
  fs.copyFileSync(archive, `${archive}.backup`);
  // Extract archive
  asar.extractAll(archive, `${archive}.unpacked`);
  // Add js code and recreate the package
  fs.appendFileSync(`${archive}.unpacked/dist/preload.bundle.js`, generateJS());
  await asar.createPackage(`${archive}.unpacked`, archive);

  bottomBar.updateBottomBar(chalk.green('🌟 Slack successfully tweaked. 🌟 Please restart Slack.'));
}

export function copyToClipboard() {
  // Apply theme first
  themes.changeTheme('oceanic');

  // copy to clipboard
  internalCopyToClipboard(generateJS());

  bottomBar.updateBottomBar(
    chalk.green('🌟 Code copied to clipboard. 🌟 Please paste the code to your Slack Dev Tools console.')
  );
}

/**
 * Remove the tweaks
 */
export async function remove(archive) {
  if (!fs.existsSync(`${archive}.backup`)) {
    return;
  }

  fs.copyFileSync(`${archive}.backup`, archive);
  bottomBar.log.write(chalk.yellow('Successfully removed!'));
}

/**
 * Print out current version
 */
export function version() {
  console.log('');
  console.log(chalk.yellow(`🧩 mtslack version ${packageJson.version} 🧩`));
}

/**
 * Execute the apply command
 */
export async function executeApply() {
  // Get the archive asar file
  const archive = await findAsar();
  bottomBar.log.write(chalk.grey(`About to tweak ${archive}...`));

  let i = 4;
  let interval = setInterval(() => {
    bottomBar.updateBottomBar(loader[i++ % 4]);
  }, 300);

  setTimeout(async () => {
    bottomBar.log.write(chalk.grey(`Removing tweaks... `));
    await remove(archive);
  }, 1000);

  setTimeout(async () => {
    bottomBar.log.write(chalk.gray(`Adding Tweaks Code to Slack... `));
    await apply(archive);
    clearInterval(interval);
  }, 3000);
}

/**
 * Copy tweak code to clipboard
 */
export async function executeCopy() {
  bottomBar.log.write(chalk.gray(`Generating Tweaks Code... `));
  await copyToClipboard();
}

/**
 * Run slack in debug mode
 */
export async function executeMac() {
  const app = await findApp();

  await exec(`export SLACK_DEVELOPER_MENU=true; open -a ${app}`);
}

export async function executeNux() {
  const app = await findApp();
  console.log(app)

  await exec(`export SLACK_DEVELOPER_MENU=true; ${app}/slack`);
}


/**
 * Execute the remove command
 */
export async function executeRemove() {
  // Get the archive asar file
  const archive = await findAsar();
  bottomBar.log.write(chalk.grey(`About to restore ${archive}...`));

  let i = 4;
  let interval = setInterval(() => {
    bottomBar.updateBottomBar(loader[i++ % 4]);
  }, 300);

  setTimeout(async () => {
    bottomBar.log.write(chalk.grey(`Removing tweaks... `));
    await remove(archive);
    clearInterval(interval);
  }, 2000);
}

/**
 * Execute the version command
 */
export const executeVersion = version;

export const execute = async (answer) => {
  try {
    switch (answer) {
      case 'copy':
        await executeCopy();
        break;
      case 'mac':
        await executeMac();
        await executeCopy();
        break;
      case 'linux':
        await executeNux();
        await executeCopy();
        break;
      case 'apply':
        await executeApply();
        break;
      case 'remove':
        await executeRemove();
        break;
      case 'version':
        await executeVersion();
        break;
      case 'exit':
        process.exit(0);
        break;
      default:
        console.error(chalk.red('Unknown command:', answer));
    }
  } catch (e) {
    console.error(chalk.red(e));
  }
};
