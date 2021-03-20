// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class HighlightPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'highlight';
    this.desc = 'Highlight Code';
    this.longDescription = 'Highlight code using highlight.js';
    this.enabled = true;
    this.shortcut = 'h';
    this.icon = 'codeblock';

    // Specific
    this.interval = undefined;
    this.DEFAULT = 'atom-one-dark';
    this.theme = 'atom-one-dark';
    this.highlightEnabled = false;

    this.extraContentId = 'hljsTheme';
    this.styleTagId = `hljs-style`;
  }

  init() {
    super.init();
    this.applyHighlight();
  }

  unloadLibrary() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (document.getElementById(this.styleTagId)) {
      document.getElementById(this.styleTagId).remove();
    }
  }

  loadLibrary() {
    // Do not attempt to load more than once
    if (document.getElementById(this.styleTagId)) {
      return;
    }

    const styles = [`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.0/styles/${this.theme}.min.css`];
    styles.map((src, index) => {
      let style = fetch(src).then((response) => response.text());
      style.then((css) => {
        const element = document.createElement('style');
        element.rel = 'stylesheet';
        element.innerHTML = css;
        element.id = `hljs-style`;
        document.head.appendChild(element);
      });
    });

    // Constantly check for code messages
    this.interval = setInterval(() => {
      this.highlightMessages();
    }, 1000);
  }

  highlightMessages() {
    if (!window.hljs) {
      return;
    }

    Array.from(document.querySelectorAll('.c-mrkdwn__pre:not(.hljs)')).forEach((element) => {
      const text = element.innerText;
      // If the first line contains the language
      let [firstLine, ...code] = text.split('\n') || [];
      if (firstLine) {
        firstLine = firstLine.replace('"', '');
        if (!firstLine.includes(' ') && window.hljs.getLanguage(firstLine)) {
          element.innerText = code.join('\n');
          element.classList.add(firstLine);
        }
      }
      window.hljs.highlightBlock(element);
    });
  }

  get tooltipDesc() {
    return `${this.desc} (theme: ${this.theme})`;
  }

  extraContent() {
    return `<input class='c-input_text p-prefs_modal__custom_theme_input' style='width:70%' placeholder='Enter your highlight.js theme' id='hljsThemeValue'
  name='hljsThemeValue' type='text' value='${this.theme}'> <button id='hljsThemeButton' name='hljsThemeButton' class='c-button c-button--outline
  c-button--medium null--outline null--medium' type='button'>Apply</button>`;
  }

  extraContentOnClick() {
    this.unloadLibrary();

    const theme = document.getElementById('hljsThemeValue').value;
    if (theme) {
      this.theme = theme;
      this.applyHighlight();
    } else {
      this.theme = this.DEFAULT;
      this.applyHighlight();
    }
  }

  onToolbarClick() {
    this.toggleHighlight();
  }

  toggleHighlight() {
    this.highlightEnabled = !this.highlightEnabled;
    this.applyHighlight();
  }

  applyHighlight() {
    if (this.highlightEnabled) {
      this.loadLibrary();
      document.dispatchEvent(new CustomEvent('HighlightChanged', { detail: this.theme }));
      document.body.classList.add('mtslack--hljs');
    } else {
      this.unloadLibrary();
      document.dispatchEvent(new CustomEvent('HighlightReset', {}));
      document.body.classList.remove('mtslack--hljs');
    }
    window.slackPluginsAPI.saveSettings();
  }

  apply() {
    this.applyHighlight();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      highlightEnabled: this.highlightEnabled,
      theme: this.theme,
    };
  }

  isApplied() {
    return this.highlightEnabled;
  }
}

window.slackPluginsAPI.plugins.highlight = new HighlightPlugin();
