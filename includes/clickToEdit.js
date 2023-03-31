// Animations.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class ClickToEditPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'clickToEdit';
    this.desc = 'Click To Edit';
    this.longDescription = 'Double click on a message to edit or copy message';
    this.enabled = true;
    this.shortcut = 'e';
    this.icon = 'pencil';

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
    this.applyClickToEdit();
  }

  doEdit(e) {
    if (e.target.classList.contains('p-rich_text_section')) {
      const container = e.target.closest('.c-message_kit__actions');
      if (!container) return;

      const toolbar = container.querySelector('[aria-label="More actions"]');
      if (!toolbar) return;

      toolbar.click();

      let editItem = document.querySelector('[data-qa="edit_message"]');
      if (editItem) {
        editItem.click();
      } else {
        let copyItem = document.querySelector('[data-qa="copy_link"]');
        copyItem && copyItem.click();
      }
    }
  }

  /**
   * Apply Dim
   */
  applyClickToEdit() {
    if (this.tweakEnabled) {
      document.addEventListener('dblclick', (e) => this.doEdit(e));
    } else {
      document.removeEventListener('dblclick', (e) => this.doEdit(e));
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyClickToEdit();
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

window.slackPluginsAPI.plugins.clickToEdit = new ClickToEditPlugin();
