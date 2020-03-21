const asar = require('asar');
const fs = require('fs');
const chalk = require('chalk');

const cli = require('./cli');

const themes = require('./themes');
const npmpackage = require('../package.json');

const plugins = fs.readFileSync(__dirname + '/../dist/plugins.js');

const {
        SLACK_FILE_PATH,
        SLACK_RESOURCES_DIR,
        SLACK_ARCHIVE,
        REPO
      } = require('./consts');

// The JS we want to inject
const generateJS = () => {

  // language=JavaScript
  return `

// Preload themes in the app
window.themePresets = ${JSON.stringify(themes.getThemesCSS())};

const event = new CustomEvent('ThemeChanged', {detail: \`
   ${themes.getThemeCSS()}
   \`});

document.addEventListener('DOMContentLoaded', function() {
  // Fetch our CSS in parallel ahead of time
  const cssPath = '${REPO}';
  let cssPromise = fetch(cssPath).then((response) => response.text());

  // Insert a style tag into the wrapper view
  cssPromise.then((css) => {
    let s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css;
    document.head.appendChild(s);
  });
  
  // Plugins
  ${plugins};

  
  this.dispatchEvent(event);
});

document.addEventListener('ThemeChanged', function(e) {
  const css = e.detail;
  let s = document.getElementById('slackCustomStyle');
  if (s) {
    s.remove();
  }

  s = document.createElement('style');
  s.type = 'text/css';
  s.innerHTML = css;
  document.head.appendChild(s);
});


`;
};

exports.apply = () => {
  console.log(`Adding ${themes.getCurrentTheme().name} Theme Code to Slack... `);
  console.log('');

  // Make a backup
  fs.copyFileSync(SLACK_ARCHIVE, `${SLACK_RESOURCES_DIR}/app.asar.backup`);
  // Extract archive
  asar.extractAll(`${SLACK_ARCHIVE}`, `${SLACK_RESOURCES_DIR}/app.asar.unpacked`);
  // Add js code and recreate the package
  fs.appendFileSync(SLACK_FILE_PATH, generateJS());
  asar.createPackage(`${SLACK_RESOURCES_DIR}/app.asar.unpacked`, `${SLACK_RESOURCES_DIR}/app.asar`);
  console.log(chalk.green('Slack successfully themed. Please restart Slack to apply the theme.'));
};

exports.remove = () => {
  try {
    fs.copyFileSync(`${SLACK_RESOURCES_DIR}/app.asar.backup`, `${SLACK_RESOURCES_DIR}/app.asar`);
    console.log(`Removing theme... `);
    console.log('');
    console.log(chalk.yellow('Successfully removed!'));
  } catch (e) {
    // do nothing
  }
};

exports.version = () => {
  console.log('');
  console.log(chalk.yellow('mtslack version ' + npmpackage.version));
};

exports.change = () => {
  this.remove();
  console.log('');
  this.selectTheme();
};

exports.selectTheme = async () => {
  const {theme: answer} = await cli.theme();
  console.log('Selected:', answer);
  themes.changeTheme(answer);

  // Apply
  this.apply();
};

exports.execute = (answer) => {
  switch (answer) {
    case 'apply':
      this.change();
      break;
    case 'remove':
      this.remove();
      break;
    case 'version':
      this.version();
      break;
    case 'exit':
      process.exit(0);
    default:
      console.error('Unknown command:', answer);
  }
};
