#! /usr/bin/env node
const asar = require('asar');
const fs = require('fs');
const os = require('os');
const osType = os.type();
const homeDir = os.homedir();

const NAME = 'One Dark';
const REPO = 'https://raw.githubusercontent.com/mallowigi/slack-one-dark-theme/master/dist/slack.min.css';

const CSS = `
:root {
    /* Modify these to change your theme colors: */
   --primary: #E5C17C;
   --accent: #568AF2;
   --text: #ABB2BF;
   --background: #282C34;
   --background-elevated: #3B4048;

   /* These should be less important: */
   --background-hover: #525964;
   --background-light: #AAA;
   --background-bright: #FFF;

   --border-dim: #666;
   --border-bright: var(--primary);

   --text-bright: #FFF;
   --text-dim: #555c69;
   --text-special: var(--primary);
   --text-accent: var(--text-bright);

   --scrollbar-background: #000;
   --scrollbar-border: var(--primary);

   --yellow: #fc0;
   --green: #98C379;
   --cyan: #56B6C2;
   --blue: #61AFEF;
   --purple: #C678DD;
   --red: #E06C75;
   --red2: #BE5046;
   --orange: #D19A66;
   --orange2: #E5707B;
   --gray: #3E4451;
   --silver: #9da5b4;
   --black: #21252b;
}
`;

// The JS we want to inject
const JS = `
document.addEventListener('DOMContentLoaded', function() {
  // Fetch our CSS in parallel ahead of time
  const cssPath = '${REPO}';
  let cssPromise = fetch(cssPath).then((response) => response.text());

  let customCustomCSS = \`
   ${CSS}
   \`;

  // Insert a style tag into the wrapper view
  cssPromise.then((css) => {
    let s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css + customCustomCSS;
    document.head.appendChild(s);
  });
});`;

const WIN_DIR = `${homeDir}\\AppData\\Local\\slack\\`;
const MAC_DIR = '/Applications/Slack\ Copy.app/Contents/Resources';
const LINUX_DIR = `/usr/lib/slack`;

function getDirectory() {
  switch (osType) {
    case 'Linux':
      return LINUX_DIR;
    case 'Windows_NT':
      return WIN_DIR;
    case 'Darwin':
      return MAC_DIR;
    default:
      return MAC_DIR;
  }
}

const SLACK_RESOURCES_DIR = getDirectory();

const SLACK_FILE_PATH = `${SLACK_RESOURCES_DIR}/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/app.asar`;

console.log(`Adding ${NAME} Theme Code to Slack... `);

// Make a backup
fs.copyFileSync(SLACK_ARCHIVE, `${SLACK_RESOURCES_DIR}/app.asar.backup`);
// Extract archive
asar.extractAll(`${SLACK_ARCHIVE}`, `${SLACK_RESOURCES_DIR}/app.asar.unpacked`);
// Add js code and recreate the package
fs.appendFileSync(SLACK_FILE_PATH, JS);
asar.createPackage(`${SLACK_RESOURCES_DIR}/app.asar.unpacked`, `${SLACK_RESOURCES_DIR}/app.asar`);