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
    this.icon = 'code';

    // Specific
    this.interval = undefined;
    this.DEFAULT = 'atom-one-dark';
    this.theme = 'atom-one-dark';
    this.highlightEnabled = false;

    this.extraContentId = 'hljsTheme';
  }

  init() {
    super.init();
    this.loadLibrary();
  }

  unloadLibrary() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    document.getElementById('hljs-script').remove();
    document.getElementById('hljs-style').remove();
  }

  loadLibrary() {
    if (!document.getElementById('hljs-script')) {
      const scripts = ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.0/highlight.min.js'];
      scripts.map((src, index) => {
        let code = fetch(src).then((response) => response.text());
        code.then((js) => {
          const element = document.createElement('script');
          element.innerHTML = js;
          element.defer = true;
          element.id = `hljs-script`;
          document.head.appendChild(element);
        });
      });
    }

    if (!document.getElementById('hljs-style')) {
      const styles = [`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.0/styles/${this.theme}.min.css`];
      styles.map((src, index) => {
        let style = fetch(src).then((response) => response.text());
        style.then((css) => {
          const element = document.createElement('link');
          element.rel = 'stylesheet';
          element.innerHTML = css;
          element.id = `hljs-style`;
          document.head.appendChild(element);
        });
      });
    }

    this.interval = setInterval(() => {
      this.highlightMessages();
    }, 1000);
  }

  highlightMessages() {
    if (!window.hljs) {
      return;
    }
    debugger;
    // Array.from(document.querySelectorAll('.c-mrkdwn__pre')).forEach((element) => {
    // Array.from(element.querySelectorAll('pre.special_formatting:not(.hljs)')).forEach((element) => {
    // const text = element.innerText;
    // const [firstLine = false] = text.split('\\n') || [];
    // if (firstLine && !firstLine.includes(' ') && window.hljs.getLanguage(firstLine)) {
    //   const newContent = text.replace(firstLine + '\\n', '');
    //   element.innerText = newContent;
    //   element.classList.add(firstLine);
    // }
    // });
    window.hljs.highlightAll();
    // });
  }

  get tooltipDesc() {
    return `${this.desc} (theme: ${this.theme})`;
  }

  extraContent() {
    return `<input class='c-input_text p-prefs_modal__custom_theme_input' style='width:70%' placeholder='Enter your highlight.js theme' id='hljsTheme'
  name='hljsTheme' type='text' value='${this.theme}'> <button id='hljsThemeButton' name='hljsThemeButton' class='c-button c-button--outline
  c-button--medium null--outline null--medium' type='button'>Apply</button>`;
  }

  extraContentOnClick() {
    const theme = document.getElementById('hljsTheme').value;
    if (theme) {
      this.theme = theme;
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
    } else {
      this.unloadLibrary();
      document.dispatchEvent(new CustomEvent('HighlightReset', {}));
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
