// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class OverlayPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'overlay';
    this.desc = 'Modal Overlays';
    this.longDescription = 'Add an overlay when modals are open';
    this.enabled = true;
    this.shortcut = 'o';
    this.icon = 'share-screen';

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
    this.applyOverlay();
  }

  /**
   * Apply Dim
   */
  applyOverlay() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--overlay');
    }
    else {
      document.body.classList.remove('mtslack--overlay');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyOverlay();
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

window.slackPluginsAPI.plugins.overlay = new OverlayPlugin();
