const asar = require('@mallowigi/asar');
const fs = require('fs');
const chalk = require('chalk');

const themes = require('./themes');
const npmpackage = require('../package.json');

const plugins = fs.readFileSync(__dirname + '/../dist/plugins.js');

const { SLACK_FILE_PATH, SLACK_RESOURCES_DIR, SLACK_ARCHIVE, REPO, ASAR } = require('./consts');

// The JS we want to inject
const generateJS = () => {
  // language=JavaScript
  return `

// Preload themes in the app
window.themePresets = ${JSON.stringify(themes.getThemesCSS())};

const event = new CustomEvent('ThemeChanged', {detail: {name: 'oceanic', css: \`
   ${themes.getThemeCSS()}
   \`}});

document.addEventListener('DOMContentLoaded', function() {
  // Fetch our CSS in parallel ahead of time
  const cssPath = '${REPO}';
  let s = document.getElementById('slackCustomCss');
  if (s) {
    s.remove();
  }
  let cssPromise = fetch(cssPath).then((response) => response.text());

  // Insert a style tag into the wrapper view
  cssPromise.then((css) => {
    let s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css;
    s.id = 'slackCustomCss';
    document.head.appendChild(s);
  });

  // Plugins
  ${plugins};

  // this.dispatchEvent(event);
  document.body.parentElement.id = 'mtslack';
  
  if (document.title === 'Server Error | Slack' || document.title === 'Slack System Status') {
    document.body.style.backgroundColor = 'var(--bg)';
  }
});

document.addEventListener('ThemeChanged', function(e) {
  const css = e.detail.css;
  const name = e.detail.name;
  let s = document.getElementById('slackCustomStyle');
  if (s) {
    s.remove();
  }
  document.body.classList.remove('mtslack');
  document.body.parentElement.id = '';

  if (!name || name === 'default') {
    return;
  }
  s = document.createElement('style');
  s.type = 'text/css';
  s.innerHTML = css;
  s.id = 'slackCustomStyle';
  document.head.appendChild(s);
  document.body.classList.add('mtslack', 'mtslack--' + name);
  document.body.parentElement.id = 'mtslack';
});

document.addEventListener('AccentChanged', function(e) {
  const customAccent = e.detail;
  let s = document.getElementById('slackCustomAccent');
  if (s) {
    s.remove();
  }

  s = document.createElement('style');
  s.type = 'text/css';
  s.id = 'slackCustomAccent';
  s.innerHTML = \`:root { --accent: \${customAccent}; --accentT: \${customAccent}; }\`;
  document.head.appendChild(s);
});

document.addEventListener('AccentReset', function(e) {
  let s = document.getElementById('slackCustomAccent');
  if (s) {
    s.remove();
  }
});

document.addEventListener('LinksChanged', function(e) {
  const customLinks = e.detail;
  let s = document.getElementById('slackCustomLinks');
  if (s) {
    s.remove();
  }

  s = document.createElement('style');
  s.type = 'text/css';
  s.id = 'slackCustomLinks';
  s.innerHTML = \`:root { --accent2: \${customLinks}; --accent2T: \${customLinks}; }\`;
  document.head.appendChild(s);
});

document.addEventListener('LinksReset', function(e) {
  let s = document.getElementById('slackCustomLinks');
  if (s) {
    s.remove();
  }
});

document.addEventListener('MainFontChanged', function(e) {
  const font = e.detail;
  let s = document.getElementById('slackCustomMainFont');
  if (s) {
    s.remove();
  }

  s = document.createElement('style');
  s.type = 'text/css';
  s.id = 'slackCustomMainFont';
  s.innerHTML = \`:root { --fontFamily: \${font}; }\`;
  document.head.appendChild(s);
});

document.addEventListener('MainFontReset', function(e) {
  let s = document.getElementById('slackCustomMainFont');
  if (s) {
    s.remove();
  }
});

document.addEventListener('MonoFontChanged', function(e) {
  const font = e.detail;
  let s = document.getElementById('slackCustomMonoFont');
  if (s) {
    s.remove();
  }

  s = document.createElement('style');
  s.type = 'text/css';
  s.id = 'slackCustomMonoFont';
  s.innerHTML = \`:root { --monoFont: \${font}; }\`;
  document.head.appendChild(s);
});

document.addEventListener('MonoFontReset', function(e) {
  let s = document.getElementById('slackCustomMonoFont');
  if (s) {
    s.remove();
  }
});

setTimeout(() => {
  if (document.getElementById('mtslack')) return;
  location.reload();
}, 200);

  `;
};



exports.apply = () => {
  console.log(`Adding Tweaks Code to Slack... `);
  console.log('');

  // Make a backup
  fs.copyFileSync(SLACK_ARCHIVE, `${SLACK_RESOURCES_DIR}/${ASAR}.backup`);
  // Extract archive
  asar.extractAll(`${SLACK_ARCHIVE}`, `${SLACK_RESOURCES_DIR}/${ASAR}.unpacked`);
  // Add js code and recreate the package
  fs.appendFileSync(SLACK_FILE_PATH + 'preload.bundle.js', generateJS());

  asar.createPackage(`${SLACK_RESOURCES_DIR}/${ASAR}.unpacked`, `${SLACK_RESOURCES_DIR}/${ASAR}`);
  console.log(chalk.green('Slack successfully tweaked. Please restart Slack to apply the tweaks.'));
};

exports.remove = () => {
  try {
    fs.copyFileSync(`${SLACK_RESOURCES_DIR}/${ASAR}.backup`, `${SLACK_RESOURCES_DIR}/${ASAR}`);
    console.log(`Removing tweaks... `);
    console.log('');
    console.log(chalk.yellow('Successfully removed!'));
  } catch (e) {
    // do nothing
  }
};

exports.version = () => {
  console.log('');
  console.log(chalk.yellow('mtslack version ' + npmpackage.version));
};

exports.change = () => {
  this.remove();
  console.log('');
  this.selectTheme();
};

exports.selectTheme = async () => {
  // const {theme: answer} = await cli.theme();
  const answer = 'oceanic';
  themes.changeTheme(answer);

  // Apply
  this.apply();
};

exports.execute = answer => {
  switch (answer) {
    case 'apply':
      this.change();
      break;
    case 'remove':
      this.remove();
      break;
    case 'version':
      this.version();
      break;
    case 'exit':
      process.exit(0);
    default:
      console.error('Unknown command:', answer);
  }
};
