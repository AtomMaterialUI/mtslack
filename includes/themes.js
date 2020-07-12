// Themes.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class NextThemePlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'nextTheme';
    this.desc = 'Loop over installed themes';
    this.longDescription = 'Add a button in the toolbar to loop over installed themes';
    this.enabled = true;
    this.shortcut = '';
    this.icon = 'magic';

    // Specific
    // Theme list
    this.themes = [
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
      'moonlight'
    ];
    // Current theme
    this.currentTheme = 0;
  }

  apply() {
    this.applyTheme();
  }

  onToolbarClick() {
    this.nextTheme();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      currentTheme: this.currentTheme
    };
  }

  /**
   * Loop over themes
   */
  nextTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;

    this.applyTheme();
  }

  applyTheme() {
    document.dispatchEvent(new CustomEvent('ThemeChanged', {
      detail: window.themePresets[this.themes[this.currentTheme]]
    }));
    window.slackPluginsAPI.saveSettings();
  }
}

window.slackPluginsAPI.plugins.nextTheme = new NextThemePlugin();
