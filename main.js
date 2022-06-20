#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import sample from '@feizheng/next-sample';
import AutoUpdate from 'cli-autoupdate';

import * as cli from './lib/cli.js';
import {execute} from './lib/command.js';
import {getPackageJson} from './lib/utils.js';

const packageJson = getPackageJson();

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
    console.log(chalk.italic(`version ${packageJson.version} by @mallowigi`));


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

    console.log(chalk.cyan('Welcome to the mtslack CLI!'));
    console.log('');

    // noinspection JSDeclarationsAtScopeStart
    const {ask: answer} = await cli.ask();

    await execute(answer);
}

// Start
async function main() {
    clear();
    await checkForUpdates();
}

async function checkForUpdates() {
    // noinspection LocalVariableNamingConventionJS
    let shouldUpdate = false;

    const update = new AutoUpdate(packageJson);
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
