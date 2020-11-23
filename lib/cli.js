const inquirer = require('inquirer');

exports.apply = () => inquirer.prompt([
  {
    message: 'Are you sure you want to apply the tweaks? [YN]',
    type: 'input',
    name: 'confirmation',
    validate(value) {
      if (value !== 'Y' && value !== 'N') {
        return 'Please enter a valid choice';
      }
      return true;
    },
  },
]);

exports.restore = () => inquirer.prompt([
  {
    message: 'Are you sure you want to restore to the factory settings? [YN]',
    type: 'input',
    name: 'confirmation',
    validate(value) {
      if (value !== 'Y' && value !== 'N') {
        return 'Please enter a valid choice';
      }
      return true;
    },
  },
]);

exports.ask = () => inquirer.prompt([
  {
    message: 'Please select an command',
    type: 'list',
    name: 'ask',
    choices: [
      {name: 'Apply tweaks', value: 'apply'},
      {name: 'Restore Slack', value: 'remove'},
      {name: 'Display mtslack Version', value: 'version'},
      {name: 'Exit', value: 'exit'},
    ],
  },

]);
