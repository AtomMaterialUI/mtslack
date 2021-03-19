const inquirer = require('inquirer');
const BottomBar = inquirer.ui.BottomBar;

const loader = ['/ Processing...', '| Processing...', '\\ Processing...', '- Processing...'];
const i = 4;
const ui = new BottomBar({ bottomBar: loader[i % 4] });

exports.loader = loader;
exports.bottomBar = ui;
