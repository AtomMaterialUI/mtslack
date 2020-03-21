// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

window.slackPluginsAPI.plugins.fonts = {
  name: 'fonts',
  desc: 'Custom Fonts',
  longDescription: 'Enter the custom fonts, separated by commas',
  enabled: true,
  shortcut: '',
  icon: 'format',

  DEFAULT_CUSTOM: 'Roboto, Slack-Lato, appleLogo, sans-serif',
  DEFAULT: 'Slack-Lato, appleLogo, sans-serif',

  fontFamily: 'Roboto, Slack-Lato, appleLogo, sans-serif',
  fontsEnabled: false,

  extraContentId: 'customFonts',

  extraContent() {
    return `<input class="c-input_text p-prefs_modal__custom_theme_input" style="width:70%" placeholder="Enter fonts, separated by commas" id="fontFamily" name="fontFamily" type="text" value="${this.fontFamily}">
<button id="customFontsButton" name="customFontsButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>`;
  },

  callback: function () {
    this.toggle();
  },

  extraContentOnClick() {
    const ff = document.getElementById('fontFamily').value;
    if (ff) {
      this.fontFamily = ff;
      this.applyFonts();
    }
  },

  // Toggle Fonts
  toggleFonts() {
    this.fontsEnabled = !this.fontsEnabled;
    this.applyFonts();
  },

  applyFonts() {
    if (this.fontsEnabled) {
      document.querySelector('body').style.fontFamily = this.fontFamily;
    }
    else {
      document.querySelector('body').style.fontFamily = 'Slack-Lato,appleLogo,sans-serif';
    }
  },

  init() {
    // Toggle Fonts
    const $fontsToggleBtn = document.createElement('button');
    this.$el = $fontsToggleBtn;

    $fontsToggleBtn.className =
      'c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';
    this.addIcon($fontsToggleBtn);
    $fontsToggleBtn.addEventListener('click', this.toggleFonts.bind(this));
    // Add tooltip
    window.slackPluginsAPI.addTooltip(this);

    let $header = document.querySelector('.p-classic_nav__right_header');
    if ($header) {
      // Add buttons
      $header.appendChild($fontsToggleBtn);
    }
  },

  toggle() {
    this.toggleDisplay(this.$el);
  },

  // Show/hide a toolbar button
  toggleDisplay(button) {
    if (this.enabled) {
      button.style.display = 'flex';
    }
    else {
      button.style.display = 'none';
    }
  },

  switch(enabled) {
    this.enabled = enabled;
    this.toggle();
  },

  addIcon(button) {
    button.innerHTML = `<i class="c-icon c-icon--${this.icon}" type="magic" aria-hidden="true"></i>`;
  }
};
