// Links.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class LinksPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'links';
    this.desc = 'Custom links color';
    this.longDescription = 'Change the links color';
    this.enabled = true;
    this.shortcut = 'l';
    this.icon = 'link';

    // Specific
    this.linksColor = '#c679dd';
    this.linksColorEnabled = false;

    this.extraContentId = 'customLinks';
  }

  get tooltipDesc() {
    return `${this.desc} (current: ${this.linksColor})`;
  }

  extraContent() {
    return `
<div class='c-color_picker__container'  role='presentation'>
    <span class='c-color_picker__color_block_container'>
        <button id='customLinksColor' class='c-button-unstyled c-color_picker__color_block' type='button' style='background: ${
          this.linksColor
        };'></button>
    </span>
    <span class='c-color_picker__hex_hash'>#</span>
    <input id='linksColor' name='linksColor' class='c-color_picker__input'  type='text' value='${this.linksColor.slice(
      1
    )}' style='min-width: auto'>
    <button id='customLinksButton' name='customLinksButton' class='c-button c-button--outline c-button--medium null--outline null--medium' type='button'>Apply</button>
</div>`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('linksColor').value;
    const bg = document.getElementById('customLinksColor');
    if (ff) {
      this.linksColor = `#${ff}`;
      bg.style.background = this.linksColor;

      this.applyLinksColor();
    }
  }

  apply() {
    this.applyLinksColor();
  }

  onToolbarClick() {
    this.toggleLinksColor();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      linksColor: this.linksColor,
      linksColorEnabled: this.linksColorEnabled,
    };
  }

  toggleLinksColor() {
    this.linksColorEnabled = !this.linksColorEnabled;
    this.applyLinksColor();
    window.slackPluginsAPI.saveSettings();
  }

  applyLinksColor() {
    if (this.linksColorEnabled) {
      document.dispatchEvent(
        new CustomEvent('LinksChanged', {
          detail: this.linksColor,
        })
      );
    } else {
      document.dispatchEvent(new CustomEvent('LinksReset', {}));
    }

    window.slackPluginsAPI.saveSettings();
  }

  isApplied() {
    return this.linksColorEnabled;
  }
}

window.slackPluginsAPI.plugins.links = new LinksPlugin();
