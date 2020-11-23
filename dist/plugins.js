const slackPluginsAPI = {
  LOCAL_STORAGE: 'slack_plugins',
  pluginsEnabled: true,
  version: 'v14.2.0',
  // Loaded plugins
  plugins: {
    main: {
      name: 'main',
      desc: 'Enable custom plugins',
      enabled: true,
      callback() {
        window.slackPluginsAPI.togglePlugins();
      }
    }
  },

  togglePlugins() {
    this.pluginsEnabled = !this.pluginsEnabled;
    Object.entries(this.plugins).forEach(([pluginName, plugin]) => {
      // Activate/Disable the plugin
      plugin.switch && plugin.switch(this.pluginsEnabled);

      // Disable options
      if (plugin.$settingEl) {
        if (this.pluginsEnabled) {
          plugin.$settingEl.classList.remove('c-plugins--disabled');
        }
        else {
          plugin.$settingEl.classList.add('c-plugins--disabled');
        }
      }
    });
  },

  /**
   * Create the plugin section in the sidebar
   */
  _insertPluginSection() {
    // Plugins menu in the sidebar
    const $pluginsSection = document.createElement('div');
    $pluginsSection.id = 'pluginsSection';
    $pluginsSection.style.fontStyle = 'italic';
    $pluginsSection.addEventListener('click', () => {
      this._showPluginsUI();
    });

    // Menu item
    const $pluginsLinkBtn = document.createElement('button');
    $pluginsLinkBtn.className = 'c-button-unstyled p-channel_sidebar__link p-channel_sidebar__section_heading_label position_relative';
    $pluginsLinkBtn.innerHTML = `
<i class="c-icon p-channel_sidebar__link__icon c-icon--star c-icon--inherit" type="list" aria-hidden="true"></i>
<span class="p-channel_sidebar__name">Slack Tweaks</span>`;

    // Add on the top
    $pluginsSection.appendChild($pluginsLinkBtn);
    this.$sideBar.prepend($pluginsSection);

//     setTimeout(() => {
//       const version = getComputedStyle(document.documentElement).getPropertyValue('--version').replaceAll('"', '') || '0.0.0';
//       if (version && this.version === version) {
//         return;
//       }
//
//       const $notif = document.querySelector('.p-ia__workspace_banner');
//       $notif.innerHTML = `
// <div role="alert" class="c-banner c-banner--neutral p-ia_banner p-workspace_banner__desktop-notifications" data-qa="banner" style="top: 0px; opacity: 1;">
//   <div class="c-banner__text">A new version of mtslack is available (${this.version})! Run <code>mtslack</code> in a terminal to update.</div>
//     <button class="c-button-unstyled c-icon_button c-icon_button--dark c-icon_button--size_medium c-banner__close" aria-label="Dismiss" type="button">
//     <i class="c-icon c-icon--times" type="times" aria-hidden="true"></i>
//     </button>
//   </div>
// </div>`
//       $notif.addEventListener('click', () => {
//         $notif.innerHTML = '';
//       });
//     }, 3000);

  },

  /**
   * Display the plugins settings modal
   */
  _showPluginsUI() {
    if (!this.pluginsUI) {
      this.pluginsUI = this._createPluginsUI();
    }
    document.body.append(this.pluginsUI);
    document.body.classList.add('ReactModal__Body--open');
    document.getElementsByClassName('p-client_container')[0].setAttribute('aria-hidden', true);
  },

  /**
   * Generate the plugin settings UI.
   * TODO EXTRACT MAGIC STRINGS
   */
  _createPluginsUI() {
    // Modal
    const $reactModal = document.createElement('div');
    $reactModal.className = 'ReactModalPortal';

    // Overlay
    const $reactOverlay = document.createElement('div');
    $reactOverlay.className = 'ReactModal__Overlay ReactModal__Overlay--after-open c-sk-overlay';
    $reactModal.appendChild($reactOverlay);

    // Contents
    const $wrapper = document.createElement('div');
    $wrapper.className = 'ReactModal__Content c-sk-modal c-sk-modal--fixed';
    $reactOverlay.appendChild($wrapper);

    // Close btn
    const $closeBtn = document.createElement('button');
    $closeBtn.className = 'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-sk-modal__close_button';
    $closeBtn.innerHTML = `<i class="c-icon c-icon--times" type="times" aria-hidden="true"></i>`;
    // Close the modal
    $closeBtn.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 13) {
        requestAnimationFrame(() => $reactModal.remove());
      }
    });
    $closeBtn.addEventListener('click', () => {
      document.body.classList.remove('ReactModal__Body--open');
      document.getElementsByClassName('p-client_container')[0].removeAttribute('aria-hidden');
      requestAnimationFrame(() => $reactModal.remove());
    });

    // Header
    const $header = document.createElement('div');
    $header.className = 'c-sk-modal_header';
    $header.innerHTML = `
<div data-qa="invite_modal_header" class="c-sk-modal_title_bar c-sk-modal_title_bar--pad_right">
<div class="c-sk-modal_title_bar__text"><h1>Slack Tweaks ${this.version}</h1></div>
</div>`;

    // Finally the settings
    const $settings = this._createSettings();

    $wrapper.append($closeBtn);
    $wrapper.append($header);
    $wrapper.append($settings);

    // animatsia!
    requestAnimationFrame(() => $wrapper.className += ' ReactModal__Content--after-open');

    return $reactModal;
  },

  /**
   * Create the modal inner part
   */
  _createSettings() {
    // Contents
    const $settings = document.createElement('div');
    $settings.className = 'c-sk-modal_content c-sk-modal_content--indicateBottom';

    // Wrapper
    const $settingsWrapper = document.createElement('div');
    $settingsWrapper.className = 'c-scrollbar c-scrollbar--inherit_size';
    $settingsWrapper.innerHTML = `<div data-qa="slack_kit_scrollbar" role="presentation" class="c-scrollbar__hider">
    <div role="presentation" class="c-scrollbar__child" style="width: 492px;">
        <div class="c-sk-modal__content__inner">
            <div data-qa="invite_modal_form" class="c-sk-modal_content_section"></div>
        </div>
    </div>
</div>`;
    $settings.append($settingsWrapper);

    // Get the placeholder for content
    const $content = $settingsWrapper.querySelector('.c-sk-modal_content_section');

    // Plugins List
    const $pluginList = document.createElement('div');
    $pluginList.className = 'c-virtual_list c-virtual_list--scrollbar c-scrollbar';
    $pluginList.innerHTML = `<div role="list" class="c-virtual_list c-virtual_list--scrollbar c-scrollbar" style="width: 440px; height: 481px;">
    <div data-qa="slack_kit_scrollbar" role="presentation" class="c-scrollbar__hider">
        <div role="presentation" class="c-scrollbar__child">
            <div data-qa="slack_kit_list" class="c-virtual_list__scroll_container c-plugins_list" role="presentation">
                
            </div>
        </div>
    </div>
</div>`;
    $content.append($pluginList);

    // Placeholder for plugins
    const $pluginListInner = $pluginList.querySelector('.c-plugins_list');
    // Header
    const $pluginListHeader = document.createElement('div');
    $pluginListHeader.className = 'c-virtual_list__item';
    $pluginListHeader.innerHTML =
      `<div class="p-channel_browser_section_header p-channel_browser_section_header--first">Plugins List</div>`;
    $pluginList.append($pluginListHeader);

    // Now load the plugins
    this._addPlugins($pluginListInner);

    return $settings;
  },

  // Add plugins to the UI
  _addPlugins($container) {
    for (let [pluginName, plugin] of Object.entries(this.plugins)) {
      if (!plugin) {
        continue;
      }

      const $divWrapper = document.createElement('div');
      $divWrapper.className = 'padding_bottom_75';

      // Toggle checkbox
      const $checkbox = this._createOptionCheckbox(plugin);
      $divWrapper.append($checkbox);

      // Explanation
      if (plugin.longDescription) {
        const $fullDescRow = document.createElement('span');
        $fullDescRow.className = 'p-admin_member_table__caption';
        $fullDescRow.innerText = plugin.longDescription;
        $divWrapper.append($fullDescRow);
      }

      if (plugin.extraContentId && plugin.extraContent) {
        const $extraContent = document.createElement('div');
        $extraContent.id = plugin.extraContentId;
        $extraContent.innerHTML = plugin.extraContent();

        if (plugin.extraContentOnClick) {
          for (const button of $extraContent.getElementsByTagName('button')) {
            button.addEventListener('click', plugin.extraContentOnClick.bind(plugin));
          }
        }

        $divWrapper.append($extraContent);
      }

      // Save the element to the plugin
      if (pluginName !== 'main') {
        plugin.$settingEl = $divWrapper;
      }

      $container.append($divWrapper);
    }
  },

  /**
   * Generate an option checkbox
   */
  _createOptionCheckbox(plugin) {
    const $wrapper = document.createElement('div');
    // $wrapper.className = 'padding_bottom_75';

    // Label
    const $label = document.createElement('label');
    $label.className = 'c-label c-label--inline c-label--pointer';
    $label.innerHTML = `<span class="c-label__text" data-qa-label-text="true">${plugin.desc}</span>`;
    $label.htmlFor = plugin.name;
    $label.title = plugin.desc;
    $wrapper.append($label);

    // Checkbox
    const $cb = document.createElement('input');
    $cb.className = 'c-input_checkbox';
    $cb.type = 'checkbox';
    $cb.id = plugin.name;
    $cb.name = plugin.name;
    $cb.checked = plugin.enabled;
    $label.append($cb);

    // Listen to events
    $cb.addEventListener('change', (event) => {
      const enabled = !!event.target.checked;
      // this.setPluginState(name, enabled);
      plugin.enabled = enabled;

      // Execute plugin
      // this.executePlugin(name, enabled);
      plugin.callback(enabled);

      if (plugin.extraContentId) {
        const $extraContent = document.getElementById(plugin.extraContentId);
        for (const child of $extraContent.children) {
          if (plugin.enabled) {
            child.removeAttribute('disabled');
          }
          else {
            child.setAttribute('disabled', true);
          }
        }
      }
    });

    return $wrapper;
  },

  /**
   * Create a tooltip for a plugin in the toolbar
   * @param plugin
   * @returns {HTMLDivElement}
   * @private
   */
  _createTooltip(plugin) {
    // Modal
    const $reactModal = document.createElement('div');
    $reactModal.className = 'ReactModalPortal';

    // Overlay
    const $reactOverlay = document.createElement('div');
    $reactOverlay.className =
      'ReactModal__Overlay ReactModal__Overlay--after-open c-popover c-popover--no-pointer c-popover--z_menu c-popover--fade';
    $reactModal.appendChild($reactOverlay);

    // Contents
    const $wrapper = document.createElement('div');
    $wrapper.className = 'ReactModal__Content ReactModal__Content--after-open popover c-popover__content';
    $wrapper.style.position = 'absolute';

    const rect = plugin.$el.getBoundingClientRect();
    $wrapper.style.top = rect.y + plugin.$el.offsetHeight + 'px';
    $wrapper.style.left = rect.x - (plugin.$el.offsetWidth * 2) + 'px';
    $reactOverlay.appendChild($wrapper);

    // Header
    const $popover = document.createElement('div');
    $popover.innerHTML = `<div role="presentation">
<div id="slack-kit-tooltip" role="tooltip" class="c-tooltip__tip c-tooltip__tip--bottom-right" data-qa="tooltip-tip">
${plugin.desc}
<div class="c-tooltip__tip_shortcut">Ctrl-Shift-${plugin.shortcut}</div>
<div class="c-tooltip__tip__arrow" style="right: 18px;"></div>
</div>
</div>`;

    $wrapper.append($popover);

    // animatsia!
    requestAnimationFrame(() => $wrapper.className += ' ReactModal__Content--after-open');

    return $reactModal;
  },

  /**
   * Create the plugin tooltip
   * @param plugin
   */
  addTooltip(plugin) {
    plugin.$el.addEventListener('mouseover', () => {
      if (plugin.$tooltip) {
        return;
      }
      plugin.$tooltip = this._createTooltip(plugin);
      document.body.append(plugin.$tooltip);
    });
    plugin.$el.addEventListener('mouseout', () => {
      plugin.$tooltip && plugin.$tooltip.remove();
      plugin.$tooltip = null;
    });
  },

  loadSettings() {
    try {
      let savedSettings = localStorage.getItem(this.LOCAL_STORAGE);
      if (savedSettings) {
        savedSettings = JSON.parse(savedSettings);

        Object.keys(this.plugins).forEach(key => {
          if (this.plugins[key] && this.plugins[key].loadSettings && savedSettings[key]) {
            this.plugins[key].loadSettings(savedSettings[key]);
          }
        });
      }
    } catch (e) {
      ;
    }
  },

  saveSettings() {
    const settings = {};
    settings.main = {
      pluginsEnabled: this.pluginsEnabled
    };

    Object.keys(this.plugins).forEach(key => {
      if (this.plugins[key] && this.plugins[key].saveSettings) {
        settings[key] = this.plugins[key].saveSettings();
      }
    });

    localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(settings));
  },

  /**
   * Main
   */
  init() {
    this._initSettings();
    this.loadSettings();
    this.initPlugins();

    // Add a keybinding to reinit
    document.addEventListener('keydown', ({ keyCode, altKey, metaKey }) => {
      if (keyCode === 68 && (metaKey || altKey)) {
        this._initSettings();
      }
    });
  },

  // Init settings dialog
  _initSettings() {
    this.interval = setInterval(() => {
      if (document.getElementById('pluginsSection')) {
        // Already added
        return;
      }

      this.sidebarLoaded = !!document.querySelector('.p-channel_sidebar__static_list');

      if (this.sidebarLoaded) {
        this.$sideBar = document.querySelector('.p-channel_sidebar__static_list .c-scrollbar__hider');
        this._insertPluginSection();
        this.loadSettings();
        this.initPlugins();
        // clearInterval(this.interval);
      }

    }, 1000);
  },

  // Call plugins's init
  initPlugins() {
    Object.entries(this.plugins).forEach(([pluginName, plugin]) => {
      plugin.init && plugin.init();
    });
  }
};

window.slackPluginsAPI = slackPluginsAPI;

/** DO NOT TOUCH THIS PART **/
// Here are files included in the end bundle

// Base.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class PluginBase {
  constructor() {
    // Mandatory parameters
    this.name = "pluginBase";
    this.desc = "A plugin description";
    this.longDescription = "Description to show in the settings";
    this.enabled = true; //Whether the plugin is enabled
    this.shortcut = ""; // Assign a shortcut key
    this.icon = ""; // Icon to put on the toolbar

    // Toolbar button
    this.$el = null;

    // Extra content for settings
    this.extraContentId = null;

    this.shortCutListener = e => {
      if (!this.enabled) {
        return;
      }
      if (e.altKey && e.ctrlKey && String.fromCharCode(e.keyCode).toLowerCase() === this.shortcut) {
        this.onToolbarClick();
        this.addIcon();
      }
    };
  }

  /**
   * Action to run when clicking on the toolbar button
   */
  callback() {
    this.toggle();
  }

  /**
   * Action to run upon initialization
   */
  init() {
    // Next Theme
    const $toolbarBtn = document.createElement("button");
    this.$el = $toolbarBtn;

    $toolbarBtn.className =
      "c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag";
    this.addIcon();
    $toolbarBtn.addEventListener("click", () => {
      this.onToolbarClick();
      this.addIcon();
    });
    // Add tooltip
    window.slackPluginsAPI.addTooltip(this);

    let $header = document.querySelector(".p-classic_nav__right_header");
    let $newHeader = document.querySelector(".p-top_nav__right");
    if ($header) {
      // Add buttons
      $header.appendChild($toolbarBtn);
    }
    if ($newHeader) {
      // Add buttons
      $newHeader.prepend($toolbarBtn);
    }

    // Show or hide the toolbar button according to settings
    this.toggleDisplay($toolbarBtn);

    // Apply preferences
    this.apply();

    // Shortcuts
    this.listenShortcuts();
  }

  listenShortcuts() {
    if (this.shortcut) {
      document.addEventListener("keydown", this.shortCutListener);
    }
  }

  /**
   * What to do on toolbar click
   * @abstract
   */
  onToolbarClick() {
    // to be implemented
  }

  /**
   * Toggle this plugin
   */
  toggle() {
    this.toggleDisplay(this.$el);
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Show or hide the toolbar button
   * @param button
   */
  toggleDisplay() {
    if (this.enabled) {
      this.$el.style.display = "flex";
    }
    else {
      this.$el.style.display = "none";
    }
  }

  /**
   * Load settings for this plugin
   * @param settings
   */
  loadSettings(settings = {}) {
    Object.assign(this, settings);
  }

  /**
   * Return settings to save
   * @abstract
   */
  saveSettings() {
    throw Error("To be implemented");
  }

  /**
   * Change the enabled state
   * @param enabled
   */
  switch(enabled) {
    this.enabled = enabled;
    this.toggle();
  }

  /**
   * Add icon to the toolbar button
   * @param button
   */
  addIcon() {
    this.$el.innerHTML = `<i class="c-icon c-icon-plugin c-icon--${
      this.icon
    } c-icon-selected--${this.isApplied()}" type="magic" aria-hidden="true"></i>`;
  }

  /**
   * Apply the plugin
   * @abstract
   */
  apply() {
    throw Error("to be implemented");
  }

  /**
   * Return the html code for the extra content
   */
  extraContent() {
    return "";
  }

  /**
   * Action executed on clicking apply
   */
  extraContentOnClick() {
    // to be implemented
  }

  isApplied() {
    // to be implemented
  }
}

window.slackPluginsAPI.pluginBase = PluginBase;

// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class DimPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'hideAway';
    this.desc = 'Dim Absent People';
    this.longDescription = 'Dim Absent People and Channels from the sidebar';
    this.enabled = true;
    this.shortcut = 'd';
    this.icon = 'channels';

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
    this.applyDim();
  }

  /**
   * Apply Dim
   */
  applyDim() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--dim');
    }
    else {
      document.body.classList.remove('mtslack--dim');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyDim();
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

window.slackPluginsAPI.plugins.hideAway = new DimPlugin();

// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class WithPresence extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'withPresence';
    this.desc = 'Presence Icons';
    this.longDescription = 'Restore old style presence icons';
    this.enabled = true;
    this.shortcut = 'p';
    this.icon = 'circle-fill';

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
    this.applyWithPresence();
  }

  /**
   * Apply WithPresence
   */
  applyWithPresence() {
    if (this.tweakEnabled) {
      document.body.classList.add('mtslack--with_presence');
    }
    else {
      document.body.classList.remove('mtslack--with_presence');
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyWithPresence();
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

window.slackPluginsAPI.plugins.withPresence = new WithPresence();

// Themes.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class NextThemePlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'nextTheme';
    this.desc = 'Loop over installed themes';
    this.longDescription = 'Add a button in the toolbar to loop over installed themes';
    this.enabled = true;
    this.shortcut = 't';
    this.icon = 'magic';

    // Specific
    // Theme list
    this.themes = [
      'oceanic',
      'darker',
      'lighter',
      'palenight',
      'deepocean',
      'monokai',
      'arcdark',
      'onedark',
      'onelight',
      'solardark',
      'solarlight',
      'dracula',
      'github',
      'nightowl',
      'lightowl',
      'moonlight',
      'default'
    ];
    // Current theme
    this.currentTheme = 0;
  }

  apply() {
    this.applyTheme();
  }

  onToolbarClick() {
    this.nextTheme();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      currentTheme: this.currentTheme
    };
  }

  /**
   * Loop over themes
   */
  nextTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;

    this.applyTheme();
  }

  applyTheme() {
    document.dispatchEvent(new CustomEvent('ThemeChanged', {
      detail: {
        name: this.themes[this.currentTheme],
        css: window.themePresets[this.themes[this.currentTheme]]
      }
    }));
    window.slackPluginsAPI.saveSettings();
  }

  isApplied() {
    return false;
  }
}

window.slackPluginsAPI.plugins.nextTheme = new NextThemePlugin();

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

// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class FontsPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'fonts';
    this.desc = 'Custom Fonts';
    this.longDescription = 'Enter the custom fonts, separated by commas';
    this.enabled = true;
    this.shortcut = 'f';
    this.icon = 'text';

    // Specific
    this.DEFAULT_CUSTOM = 'Roboto, Slack-Lato, appleLogo, sans-serif';
    this.DEFAULT = 'Slack-Lato, appleLogo, sans-serif';

    this.fontFamily = 'Roboto, Slack-Lato, appleLogo, sans-serif';
    this.fontsEnabled = false;

    this.extraContentId = 'customFonts';
  }

  extraContent() {
    return `<input class="c-input_text p-prefs_modal__custom_theme_input" style="width:70%" placeholder="Enter fonts, separated by commas" id="fontFamily" name="fontFamily" type="text" value="${this.fontFamily}">
<button id="customFontsButton" name="customFontsButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('fontFamily').value;
    if (ff) {
      this.fontFamily = ff;
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
    this.fontsEnabled = !this.fontsEnabled;
    this.applyFonts();
  }

  /**
   * Apply fonts
   */
  applyFonts() {
    if (this.fontsEnabled) {
      document.querySelector('body').style.fontFamily = this.fontFamily;
      document.dispatchEvent(
        new CustomEvent('MainFontChanged', {
          detail: this.fontFamily
        })
      );
    }
    else {
      document.querySelector('body').style.fontFamily = this.DEFAULT;
      document.dispatchEvent(new CustomEvent('MainFontReset', {}));
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
      fontFamily: this.fontFamily,
      fontsEnabled: this.fontsEnabled
    };
  }

  isApplied() {
    return this.fontsEnabled;
  }
}

window.slackPluginsAPI.plugins.fonts = new FontsPlugin();

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

  extraContent() {
    return `<input class="c-input_text p-prefs_modal__custom_theme_input" style="width:70%" placeholder="Enter monospace fonts, separated by commas" id="monoFontFamily" name="monoFontFamily" type="text" value="${this.monoFontFamily}">
<button id="customMonoFontsButton" name="customMonoFontsButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>`;
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
          detail: this.monoFontFamily
        })
      );
    }
    else {
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
      monoFontsEnabled: this.monoFontsEnabled
    };
  }

  isApplied() {
    return this.monoFontsEnabled;
  }
}

window.slackPluginsAPI.plugins.monofonts = new MonoFontsPlugin();

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

  extraContent() {
    return `
<div class="c-color_picker__container"  role="presentation">
    <span class="c-color_picker__color_block_container">
        <button id="customAccentColor" class="c-button-unstyled c-color_picker__color_block" type="button" style="background: ${
      this.accentColor
    };"></button>
    </span>
    <span class="c-color_picker__hex_hash">#</span>
    <input id="accentColor" name="accentColor" class="c-color_picker__input"  type="text" value="${this.accentColor.slice(
      1
    )}" style="min-width: auto">
    <button id="customAccentButton" name="customAccentButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>
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
      accentColorEnabled: this.accentColorEnabled
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
          detail: this.accentColor
        })
      );
    }
    else {
      document.dispatchEvent(new CustomEvent('AccentReset', {}));
    }

    window.slackPluginsAPI.saveSettings();
  }

  isApplied() {
    return this.accentColorEnabled;
  }
}

window.slackPluginsAPI.plugins.accent = new AccentPlugin();

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
    this.linksColor = '#C679DD';
    this.linksColorEnabled = false;

    this.extraContentId = 'customLinks';
  }

  extraContent() {
    return `
<div class="c-color_picker__container"  role="presentation">
    <span class="c-color_picker__color_block_container">
        <button id="customLinksColor" class="c-button-unstyled c-color_picker__color_block" type="button" style="background: ${
      this.linksColor
    };"></button>
    </span>
    <span class="c-color_picker__hex_hash">#</span>
    <input id="linksColor" name="linksColor" class="c-color_picker__input"  type="text" value="${this.linksColor.slice(
      1
    )}" style="min-width: auto">
    <button id="customLinksButton" name="customLinksButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>
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
      linksColorEnabled: this.linksColorEnabled
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
          detail: this.linksColor
        })
      );
    }
    else {
      document.dispatchEvent(new CustomEvent('LinksReset', {}));
    }

    window.slackPluginsAPI.saveSettings();
  }

  isApplied() {
    return this.linksColorEnabled;
  }
}

window.slackPluginsAPI.plugins.links = new LinksPlugin();


/** END DO NOT TOUCH THIS PART */

window.slackPluginsAPI.init();
