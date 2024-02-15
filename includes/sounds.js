// Sounds.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class SoundsPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'sounds';
    this.desc = 'Custom Sounds';
    this.longDescription = 'Sounds';
    this.enabled = true;
    this.shortcut = 's';
    this.icon = 'bell';

    this.sounds = '12px Monaco,Menlo,Consolas,Courier New,monospace';
    this.soundsEnabled = false;
  }

  get tooltipDesc() {
    return `${this.desc} (current: ${this.sounds})`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('sounds').value;
    if (ff) {
      this.sounds = ff;
      this.applySounds();
    }
  }

  onToolbarClick() {
    this.toggleSounds();
  }

  /**
   * Toggle the setting
   */
  toggleSounds() {
    this.soundsEnabled = !this.soundsEnabled;
    this.applySounds();
  }

  /**
   * Apply fonts
   */
  applySounds() {
    const $targetNode = document.querySelector('.c-virtual_list__scroll_container');
    const config = { childList: true, subtree: true };
    const callback = async (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (let node of mutation.addedNodes) {
            console.log('node', node);
            if (node.classList.contains('c-virtual_list__item')) {
              await this.playAudio();
            }
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe($targetNode, config);
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applySounds();
  }

  async playAudio() {
    const audio = new Audio('https://cdn.freesound.org/previews/186/186719_105499-lq.mp3');
    await audio.load();
    return audio.play();
  }

  /**
   * Save Settings
   * @returns {{fontFamily: string, fontsEnabled: boolean, enabled: boolean}}
   */
  saveSettings() {
    return {
      enabled: this.enabled,
      sounds: this.sounds,
      soundsEnabled: this.soundsEnabled,
    };
  }

  isApplied() {
    return this.soundsEnabled;
  }
}

window.slackPluginsAPI.plugins.sounds = new SoundsPlugin();
