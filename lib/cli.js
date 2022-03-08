import inquirer from 'inquirer';
import chalk from 'chalk';
import { getDefaultLocation } from './dirs.js';

export const askLocation = () =>
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
export const ask = () =>
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
