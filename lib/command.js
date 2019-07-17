const asar = require('asar');
const fs = require('fs');
const chalk = require('chalk');

const {THEME_NAME, THEME_CSS} = require('./themes');

const {
        SLACK_FILE_PATH,
        SLACK_RESOURCES_DIR,
        SLACK_ARCHIVE,
        REPO,
      } = require('./consts');

// The JS we want to inject
const JS = `
document.addEventListener('DOMContentLoaded', function() {
  // Fetch our CSS in parallel ahead of time
  const cssPath = '${REPO}';
  let cssPromise = fetch(cssPath).then((response) => response.text());

  let customCustomCSS = \`
   ${THEME_CSS}
   \`;

  // Insert a style tag into the wrapper view
  cssPromise.then((css) => {
    let s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css + customCustomCSS;
    document.head.appendChild(s);
  });
});`;

exports.apply = () => {
  console.log(`Adding ${THEME_NAME} Theme Code to Slack... `);
  console.log('');

  // Make a backup
  fs.copyFileSync(SLACK_ARCHIVE, `${SLACK_RESOURCES_DIR}/app.asar.backup`);
  // Extract archive
  asar.extractAll(`${SLACK_ARCHIVE}`, `${SLACK_RESOURCES_DIR}/app.asar.unpacked`);
  // Add js code and recreate the package
  fs.appendFileSync(SLACK_FILE_PATH, JS);
  asar.createPackage(`${SLACK_RESOURCES_DIR}/app.asar.unpacked`, `${SLACK_RESOURCES_DIR}/app.asar`);
  console.log(chalk.green('Slack successfully themed. Please restart Slack to apply the theme.'));
};

exports.remove = () => {
  console.log(`Removing theme... `);
  console.log('');
  fs.copyFileSync(`${SLACK_RESOURCES_DIR}/app.asar.backup`, `${SLACK_RESOURCES_DIR}/app.asar`);
  console.log(chalk.yellow('Successfully removed!'));
};

exports.update = () => {
  console.log(chalk.cyan('We will now proceed to update the theme with the latest changes...'));
  console.log('');
  this.remove();
  console.log('');
  this.apply();
  console.log(chalk.green('Changes successfully applied. Please restart the app to take effect.'));
};

exports.execute = (answer) => {
  switch (answer) {
    case 'apply':
      this.apply();
      break;
    case 'remove':
      this.remove();
      break;
    case 'update':
      this.update();
      break;
    default:
      console.error('Unknown command:', answer);
  }
};