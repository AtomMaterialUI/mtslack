// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class HideAwayPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'hideAway';
    this.desc = 'Hide Absent People';
    this.longDescription = 'Hide Absent People from the list';
    this.enabled = true;
    this.shortcut = '';
    this.icon = 'disable';

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
    this.applyHide();
  }

  /**
   * Apply fonts
   */
  applyHide() {
    if (this.tweakEnabled) {
      document.querySelectorAll('.p-channel_sidebar__name--away').forEach(el => {
        el.closest('.p-channel_sidebar__static_list__item').style.display = 'none';
      });
    }
    else {
      document.querySelectorAll('.p-channel_sidebar__name--away').forEach(el => {
        el.closest('.p-channel_sidebar__static_list__item').style.display = 'block';
      });
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyHide();
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
}

window.slackPluginsAPI.plugins.hideAway = new HideAwayPlugin();
