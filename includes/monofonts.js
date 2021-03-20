// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class MonoFontsPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'monofonts';
    this.desc = 'Custom Monospace Fonts';
    this.longDescription = 'Enter the font size and custom monospace fonts, separated by commas';
    this.enabled = true;
    this.shortcut = 'm';
    this.icon = 'code';

    // Specific
    this.DEFAULT_CUSTOM = '12px Fira Code,JetBrains Mono,Operator Mono,Monaco,Menlo,Consolas,Courier New,monospace';
    this.DEFAULT = '12px Monaco,Menlo,Consolas,Courier New,monospace';

    this.monoFontFamily = '12px Monaco,Menlo,Consolas,Courier New,monospace';
    this.monoFontsEnabled = false;

    this.extraContentId = 'customMonoFonts';
  }

  get tooltipDesc() {
    return `${this.desc} (current: ${this.monoFontFamily})`;
  }

  extraContent() {
    return `<input class='c-input_text p-prefs_modal__custom_theme_input' style='width:70%' placeholder='Enter monospace fonts, separated by commas' id='monoFontFamily' name='monoFontFamily' type='text' value='${this.monoFontFamily}'>
<button id='customMonoFontsButton' name='customMonoFontsButton' class='c-button c-button--outline c-button--medium null--outline null--medium' type='button'>Apply</button>`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('monoFontFamily').value;
    if (ff) {
      this.monoFontFamily = ff;
      this.applyFonts();
    }
  }

  onToolbarClick() {
    this.toggleFonts();
  }

  /**
   * Toggle the setting
   */
  toggleFonts() {
    this.monoFontsEnabled = !this.monoFontsEnabled;
    this.applyFonts();
  }

  addNewStyle(newStyle) {
    let styleElement = document.getElementById('styles_js');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = 'styles_js';
      document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
  }

  /**
   * Apply fonts
   */
  applyFonts() {
    if (this.monoFontsEnabled) {
      this.addNewStyle(`pre,code {font: ${this.monoFontFamily} !important;}`);
      document.dispatchEvent(
        new CustomEvent('MonoFontChanged', {
          detail: this.monoFontFamily,
        })
      );
    } else {
      this.addNewStyle(`pre,code {font: ${this.DEFAULT} !important;}`);
      document.dispatchEvent(new CustomEvent('MonoFontReset', {}));
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyFonts();
  }

  /**
   * Save Settings
   * @returns {{fontFamily: string, fontsEnabled: boolean, enabled: boolean}}
   */
  saveSettings() {
    return {
      enabled: this.enabled,
      monoFontFamily: this.monoFontFamily,
      monoFontsEnabled: this.monoFontsEnabled,
    };
  }

  isApplied() {
    return this.monoFontsEnabled;
  }
}

window.slackPluginsAPI.plugins.monofonts = new MonoFontsPlugin();
