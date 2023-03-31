// Animations.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class AnimationsPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'animations';
    this.desc = 'Animations';
    this.longDescription = 'Add animations';
    this.enabled = true;
    this.shortcut = 'a';
    this.icon = 'spiral';

    this.tweakEnabled = true;
  }

  onToolbarClick() {
    this.toggleHide();
  }

  /**
   * Toggle the setting
   */
  toggleHide() {
    this.tweakEnabled = !this.tweakEnabled;
    this.applyAnimations();
  }

  /**
   * Apply Dim
   */
  applyAnimations() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--animations');
    } else {
      document.body.classList.remove('mtslack--animations');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyAnimations();
  }

  /**
   * Save Settings
   */
  saveSettings() {
    return {
      enabled: this.enabled,
      tweakEnabled: this.tweakEnabled,
    };
  }

  isApplied() {
    return this.tweakEnabled;
  }
}

window.slackPluginsAPI.plugins.animations = new AnimationsPlugin();
