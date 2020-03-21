#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const isRoot = require('is-root');
const cli = require('./lib/cli');
const {execute} = require('./lib/command');

// Start
async function main() {
  checkForUpdates();

  clear();
  console.log(chalk.yellow(figlet.textSync('Slack Theme Applier')));

  console.log(chalk.cyan('Welcome to the Slack Theme Applier CLI!'));
  console.log('');
  console.log(chalk.red('Please note that this is still experimental and can ruin your Slack application! In the case of a problem, please reinstall Slack.'));
  console.log('');

  if (!isRoot()){
    console.log(chalk.red('You must be root to execute this command. Run with "sudo mtslack"'));
    process.exit(1);
  }

  const {ask: answer} = await cli.ask();

  execute(answer);
}

function checkForUpdates(){
  const AutoUpdate = require('cli-autoupdate');

  // load package.json of the package you wish to update
  let pkg = require('./package.json');

  const update = new AutoUpdate(pkg);

  update.on('update', () => console.log('started update'));
  update.on('finish', () => console.log('finished updating'));
}

main();
