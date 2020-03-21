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
      {name: 'Display mtslack Version', value: 'version'},
    ],
  },

]);

exports.theme = () => inquirer.prompt([
  {
    message: 'Select a theme',
    type: 'list',
    name: 'theme',
    choices: [
      {name: 'Material Oceanic', value: 'oceanic'},
      {name: 'Material Darker', value: 'darker'},
      {name: 'Material Lighter', value: 'lighter'},
      {name: 'Material Palenight', value: 'palenight'},
      {name: 'Material Deep Ocean', value: 'deepocean'},
      {name: 'Monokai Pro', value: 'monokai'},
      {name: 'Dracula', value: 'dracula'},
      {name: 'Arc Dark', value: 'arcdark'},
      {name: 'GitHub', value: 'github'},
      {name: 'Atom One Dark', value: 'onedark'},
      {name: 'Atom One Light', value: 'onelight'},
      {name: 'Solarized Dark', value: 'solardark'},
      {name: 'Solarized Light', value: 'solarlight'},
      {name: 'Night Owl', value: 'nightowl'},
      {name: 'Light Owl', value: 'lightowl'},
    ],
  },

]);
