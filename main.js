#! /usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cli = require('./lib/cli');
const {execute} = require('./lib/command');

// Start
async function main() {
  clear();
  console.log(chalk.yellow(figlet.textSync('Slack Theme Applier')));

  console.log(chalk.cyan('Welcome to the Slack Theme Applier CLI!'));
  console.log('');
  console.log(chalk.red('Please note that this is still experimental and can ruin your Slack application! In the case of a problem, please reinstall Slack.'));
  console.log('');
  const {ask: answer} = await cli.ask();

  execute(answer);
}

main();