const inquirer = require('inquirer');
const chalk = require('chalk');
const os = require('os');

const { getDefaultLocation } = require('./dirs');
const { getIsMac } = require('./utils');

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
        // Use clipboard workaround for Mac, otherwise apply
        ...(getIsMac()
          ? [{ name: 'Run Slack in Dev Mode and copy custom code to clipboard (Mac)', value: 'mac' }]
          : [
              { name: 'Apply tweaks', value: 'apply' },
              { name: 'Restore Slack', value: 'remove' },
            ]),
        { name: 'Display mtslack Version', value: 'version' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);
