import inquirer from 'inquirer';

export const loader = ['/ Processing...', '| Processing...', '\\ Processing...', '- Processing...'];
// TODO: Should getBottomBar since this is an import effect that logs to console
export const bottomBar = new inquirer.ui.BottomBar({ bottomBar: loader[0] });
