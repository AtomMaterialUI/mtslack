#! /usr/bin/env node
const asar = require('asar');
const fs = require('fs');

// First make sure the wrapper app is loaded
const JS = `
document.addEventListener('DOMContentLoaded', function() {
  // Fetch our CSS in parallel ahead of time
  const cssPath =
          'https://raw.githubusercontent.com/mallowigi/slack-one-dark-theme/master/custom.css';
  let cssPromise = fetch(cssPath).then((response) => response.text());

  let customCustomCSS = \`
   :root {
      /* Modify these to change your theme colors: */
     --primary: #E5C17C;
     --accent: #568AF2;
     --text: #ABB2BF;
     --background: #282C34;
     --background-elevated: #3B4048;

     /* These should be less important: */
     --background-hover: lighten(#3B4048, 10%);
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
   \`;

  // Insert a style tag into the wrapper view
  cssPromise.then((css) => {
    let s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css + customCustomCSS;
    document.head.appendChild(s);
  });
});`;

const SLACK_RESOURCES_DIR="/Applications/Slack\ Copy.app/Contents/Resources"
const SLACK_FILE_PATH=`${SLACK_RESOURCES_DIR}/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/app.asar`;

console.log("Adding One Dark Theme Code to Slack... ")

// Make a backup
fs.copyFile(SLACK_ARCHIVE, `${SLACK_RESOURCES_DIR}/app.asar.backup`);
// Extract archive
asar.extractAll(`${SLACK_RESOURCES_ARCHIVE}`, `${SLACK_RESOURCES_DIR}/app.asar.unpacked`);
// Add js code and recreate the package
fs.appendFile(SLACK_FILE_PATH, JS, () => {
  asar.createPackage(`${SLACK_RESOURCES_DIR}/app.asar.unpacked`, `${SLACK_RESOURCES_DIR}/app.asar`);
});
// asar extract ${SLACK_RESOURCES_DIR}/app.asar ${SLACK_RESOURCES_DIR}/app.asar.unpacked
// sudo tee -a "${SLACK_FILE_PATH}" > /dev/null <<< "$JS"
// sudo npx asar pack ${SLACK_RESOURCES_DIR}/app.asar.unpacked ${SLACK_RESOURCES_DIR}/app.asar