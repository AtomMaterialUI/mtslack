// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class WithPresence extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'withPresence';
    this.desc = 'Presence Icons';
    this.longDescription = 'Restore old style presence icons';
    this.enabled = true;
    this.shortcut = 'p';
    this.icon = 'circle-fill';

    this.tweakEnabled = false;
  }

  onToolbarClick() {
    this.toggleHide();
  }

  /**
   * Toggle the setting
   */
  toggleHide() {
    this.tweakEnabled = !this.tweakEnabled;
    this.applyWithPresence();
  }

  /**
   * Apply WithPresence
   */
  applyWithPresence() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--with_presence');
    }
    else {
      document.body.classList.remove('mtslack--with_presence');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyWithPresence();
  }

  /**
   * Save Settings
   */
  saveSettings() {
    return {
      enabled: this.enabled,
      tweakEnabled: this.tweakEnabled
    };
  }

  isApplied() {
    return this.tweakEnabled;
  }
}

window.slackPluginsAPI.plugins.withPresence = new WithPresence();
