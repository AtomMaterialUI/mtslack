import inquirer from 'inquirer';
import chalk from 'chalk';
import { getDefaultLocation } from './dirs.js';
import { isMac } from './utils.js';

export const askLocation = () =>
  inquirer.prompt([
    {
      message: `(Optional) Slack application location (default ${chalk.blue(getDefaultLocation())})`,
      type: 'input',
      name: 'location',

      default: getDefaultLocation(),
    },
  ]);

const macOptions = [
  {
    name: 'Run Slack in Dev Mode and copy custom code to clipboard',
    value: 'mac',
  },
];

const nuxOptions = [
  {
    name: 'Run Slack in Dev Mode and copy custom code to clipboard',
    value: 'linux',
  },
];


// const nonMacOptions = [
//   { name: 'Apply tweaks', value: 'apply' },
//   { name: 'Restore Slack', value: 'remove' },
// ];

/**
 * Main menu
 */
export const ask = () =>
  inquirer.prompt([
    {
      message: 'Please select an command',
      type: 'list',
      name: 'ask',
      choices: [
        ...(isMac() ? macOptions : nuxOptions),
        { name: 'Display mtslack Version', value: 'version' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);
