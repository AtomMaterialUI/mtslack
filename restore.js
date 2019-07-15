const fs = require('fs');
const SLACK_RESOURCES_DIR="/Applications/Slack\ Copy.app/Contents/Resources"
const SLACK_FILE_PATH=`${SLACK_RESOURCES_DIR}/app.asar.unpacked/dist/ssb-interop.bundle.js`;
const SLACK_ARCHIVE = `${SLACK_RESOURCES_DIR}/app.asar`;

console.log('Restoring backup');

fs.copyFile(`${SLACK_RESOURCES_DIR}/app.asar.backup`, `${SLACK_RESOURCES_DIR}/app.asar`);