const inquirer = require('inquirer');
const chalk = require('chalk');

const { getDefaultLocation } = require('./dirs');

exports.askLocation = () =>
  inquirer.prompt([
    {
      message: `(Optional) Slack application location (default ${chalk.blue(getDefaultLocation())})`,
      type: 'input',
      name: 'location',
      default: getDefaultLocation(),
    },
  ]);

/**
 * Main menu
 */
exports.ask = () =>
  inquirer.prompt([
    {
      message: 'Please select an command',
      type: 'list',
      name: 'ask',
      choices: [
        { name: 'Run Slack in Dev Mode and copy custom code to clipboard (Mac)', value: 'mac' },
        { name: 'Display mtslack Version', value: 'version' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);
