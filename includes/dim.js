// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class DimPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'hideAway';
    this.desc = 'Dim Absent People';
    this.longDescription = 'Dim Absent People and Channels from the sidebar';
    this.enabled = true;
    this.shortcut = 'd';
    this.icon = 'channels';

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
    this.applyDim();
  }

  /**
   * Apply Dim
   */
  applyDim() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--dim');
    }
    else {
      document.body.classList.remove('mtslack--dim');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyDim();
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

window.slackPluginsAPI.plugins.hideAway = new DimPlugin();
