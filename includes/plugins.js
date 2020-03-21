const slackPluginsAPI = {
  pluginsEnabled: true,
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
  },

  /**
   * Display the plugins settings modal
   */
  _showPluginsUI() {
    if (!this.pluginsUI) {
      this.pluginsUI = this._createPluginsUI();
    }
    document.body.append(this.pluginsUI);
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
    $closeBtn.className = 'c-button-unstyled c-icon_button c-icon_button--light c-sk-modal__close_button';
    $closeBtn.innerHTML = `<i class="c-icon c-icon--times" type="times" aria-hidden="true"></i>`;
    // Close the modal
    $closeBtn.addEventListener('keydown', ({keyCode}) => {
      if (keyCode === 13) {
        requestAnimationFrame(() => $reactModal.remove());
      }
    });
    $closeBtn.addEventListener('click', () => {
      requestAnimationFrame(() => $reactModal.remove());
    });

    // Header
    const $header = document.createElement('div');
    $header.className = 'c-sk-modal_header';
    $header.innerHTML = `
<div data-qa="invite_modal_header" class="c-sk-modal_title_bar c-sk-modal_title_bar--pad_right">
<div class="c-sk-modal_title_bar__text"><h1>Slack Tweaks</h1></div>
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
    $wrapper.className = 'ReactModal__Content ReactModal__Content--after-open popover';
    $wrapper.style.position = 'absolute';
    $wrapper.style.top = plugin.$el.offsetTop + plugin.$el.offsetHeight + 'px';
    $wrapper.style.left = plugin.$el.offsetLeft - (plugin.$el.offsetWidth * 2) + 'px';
    $reactOverlay.appendChild($wrapper);

    // Header
    const $popover = document.createElement('div');
    $popover.innerHTML = `<div role="presentation">
<div id="slack-kit-tooltip" role="tooltip" class="c-tooltip__tip c-tooltip__tip--bottom-right" data-qa="tooltip-tip">
${plugin.desc}
<div class="c-tooltip__tip_shortcut">${plugin.shortcut}</div>
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

  /**
   * Main
   */
  init() {
    // let savedSettings = localStorage.getItem('slack_plugins');
    // if (savedSettings) {
    //   this.plugins = Object.assign({}, this.plugins, JSON.parse(savedSettings));
    // }

    this._initSettings();

    // Add a keybinding to reinit
    document.addEventListener('keydown', ({keyCode, altKey, metaKey}) => {
      if (keyCode === 68 && (metaKey || altKey)) {
        this._initSettings();
      }
    });
  },

  // Init settings dialog
  _initSettings() {
    const maxTries = 100;
    let counter = 0;

    this.interval = setInterval(() => {
      counter++;
      if (document.getElementById('pluginsSection')) {
        // Already added
        return;
      }

      if (counter > maxTries) {
        clearInterval(this.interval);
        return;
      }

      this.sidebarLoaded = !!document.querySelector('.p-channel_sidebar__static_list');

      if (this.sidebarLoaded) {
        this.$sideBar = document.querySelector('.p-channel_sidebar__static_list .c-scrollbar__hider');
        this._insertPluginSection();
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

//= include themes.js
//= include sidebar.js
//= include fonts.js

/** END DO NOT TOUCH THIS PART */

window.slackPluginsAPI.init();
