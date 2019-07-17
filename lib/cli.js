const inquirer = require('inquirer');

exports.apply = () => inquirer.prompt([
  {
    message: 'Are you sure you want to apply the theme? [YN]',
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
    message: 'Are you sure you want to restore to the default backup? [YN]',
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
      {name: 'Apply theme', value: 'apply'},
      {name: 'Remove theme', value: 'remove'},
      {name: 'Update theme', value: 'update'},
    ],
  },

]);