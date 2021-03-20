// Accent.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class AccentPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'accent';
    this.desc = 'Custom accent color';
    this.longDescription = 'Change the accent color';
    this.enabled = true;
    this.shortcut = 'a';
    this.icon = 'highlight-filled';

    // Specific
    this.accentColor = '#80cbc4';
    this.accentColorEnabled = false;

    this.extraContentId = 'customAccent';
  }

  get tooltipDesc() {
    return `${this.desc} (current: ${this.accentColor})`;
  }

  extraContent() {
    return `
<div class='c-color_picker__container'  role='presentation'>
    <span class='c-color_picker__color_block_container'>
        <button id='customAccentColor' class='c-button-unstyled c-color_picker__color_block' type='button' style='background: ${
          this.accentColor
        };'></button>
    </span>
    <span class='c-color_picker__hex_hash'>#</span>
    <input id='accentColor' name='accentColor' class='c-color_picker__input'  type='text' value='${this.accentColor.slice(
      1
    )}' style='min-width: auto'>
    <button id='customAccentButton' name='customAccentButton' class='c-button c-button--outline c-button--medium null--outline null--medium' type='button'>Apply</button>
</div>`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('accentColor').value;
    const bg = document.getElementById('customAccentColor');
    if (ff) {
      this.accentColor = `#${ff}`;
      bg.style.background = this.accentColor;

      this.applyAccent();
    }
  }

  apply() {
    this.applyAccent();
  }

  onToolbarClick() {
    this.toggleAccent();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      accentColor: this.accentColor,
      accentColorEnabled: this.accentColorEnabled,
    };
  }

  toggleAccent() {
    this.accentColorEnabled = !this.accentColorEnabled;
    this.applyAccent();
    window.slackPluginsAPI.saveSettings();
  }

  applyAccent() {
    if (this.accentColorEnabled) {
      document.dispatchEvent(
        new CustomEvent('AccentChanged', {
          detail: this.accentColor,
        })
      );
    } else {
      document.dispatchEvent(new CustomEvent('AccentReset', {}));
    }

    window.slackPluginsAPI.saveSettings();
  }

  isApplied() {
    return this.accentColorEnabled;
  }
}

window.slackPluginsAPI.plugins.accent = new AccentPlugin();
