#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const sample = require('@feizheng/next-sample');
const cli = require('./lib/cli');
const { getIsMac } = require('./lib/utils');
const { execute } = require('./lib/command');
const pkg = require('./package.json');

async function run() {
  console.log(
    chalk.yellow(
      figlet.textSync('mtslack', {
        font: sample(['Whimsy']),
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
  console.log(chalk.italic(`version ${pkg.version} by @mallowigi`));

  if (getIsMac()) {
    console.log(chalk.bold.red(`IMPORTANT UPDATE!!!!!`));
    console.log('');
    console.log(
      `Since version 4.22.0 of Slack, it is no longer possible to apply custom tweaks, as they have patched the option to do so.`
    );
    console.log(
      'However, you can still generate the custom code, that you can paste in Slack dev tools while in dev mode (see README).'
    );
    console.log('');
    console.log('');
  }
  console.log(chalk.cyan('Welcome to the mtslack CLI!'));
  console.log('');

  // noinspection JSDeclarationsAtScopeStart
  const { ask: answer } = await cli.ask();

  await execute(answer);
}

// Start
async function main() {
  clear();
  await checkForUpdates();
}

async function checkForUpdates() {
  // noinspection LocalVariableNamingConventionJS
  const AutoUpdate = require('cli-autoupdate');
  let shouldUpdate = false;

  const update = new AutoUpdate(pkg);
  console.log(chalk.bold('Checking for updates...'));

  update.on('update', () => {
    console.log(chalk.bold('A new update is available! Starting autoupdate...'));
    shouldUpdate = true;
  });
  update.on('finish', async () => {
    console.log(chalk.bold('Finished checking for updates!'));
    if (shouldUpdate) {
      console.log('Update finished. Please rerun the command.');
      process.exit(0);
    } else {
      await run();
    }
  });
}

main();
