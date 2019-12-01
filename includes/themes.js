// Themes.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

window.slackPluginsAPI.plugins.nextTheme = {
  name: 'nextTheme',
  desc: 'Loop over installed themes',
  descLong: 'Add a button in the toolbar to loop over installed themes',
  enabled: true,
  shortcut: '',
  callback: function () {
    this.toggle();
  },
  // Theme list
  themes: [
    'oceanic',
    'darker',
    'lighter',
    'palenight',
    'deepocean',
    'monokai',
    'arcdark',
    'onedark',
    'onelight',
    'solardark',
    'solarlight',
    'dracula',
    'github',
    'nightowl',
    'lightowl',
  ],
  // Current theme
  currentTheme: 0,

  // Loop over themes
  nextTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;

    document.dispatchEvent(new CustomEvent('ThemeChanged', {
      detail: window.themePresets[this.themes[this.currentTheme]],
    }));
  },

  init() {
    // Next Theme
    const $nextThemeBtn = document.createElement('button');
    this.$el = $nextThemeBtn;

    $nextThemeBtn.className =
      'c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';
    $nextThemeBtn.innerHTML = `<i class="c-icon c-icon--magic" type="magic" aria-hidden="true"></i>`;
    $nextThemeBtn.addEventListener('click', this.nextTheme.bind(this));
    // Add tooltip
    window.slackPluginsAPI.addTooltip(this);

    // this.toggleDisplay($nextThemeBtn, 'nextTheme');

    let $header = document.querySelector('.p-classic_nav__right_header');
    if ($header) {
      // Add buttons
      $header.appendChild($nextThemeBtn);
    }
  },

  toggle() {
    this.toggleDisplay(this.$el);
  },

  // Show/hide a toolbar button
  toggleDisplay(button) {
    if (this.enabled) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  },
};
