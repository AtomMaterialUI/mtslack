const slackPlugins = {
  // Prebundled themes
  themes: [
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
  ],
  // Current theme
  currentTheme: 0,

  // Loaded plugins
  plugins: {
    main: {
      name: 'main',
      desc: 'Enable custom plugins',
      enabled: true,
    },
    nextTheme: {
      name: 'nextTheme',
      desc: 'Loop over installed themes',
      enabled: true,
    },
  },

  // Initialize Buttons On Main Window
  initCustomControls() {
    const customControlsIntervalMaxTries = 100;
    let customControlsIntervalCounter = 0;

    this.customControlsInterval = setInterval(() => {
      customControlsIntervalCounter++;
      if (customControlsIntervalCounter > customControlsIntervalMaxTries) {
        clearInterval(this.customControlsInterval);
        return;
      }

      this.customControlsLoaded = document.getElementsByClassName('p-classic_nav__right__custom_controls')[0] !== undefined;

      if (!this.customControlsLoaded) {
        const div = document.createElement('div');
        div.className = 'p-classic_nav__right__custom_controls';
        document.querySelector('.p-classic_nav__right_header').append(div);

        const sidebarBtn = document.createElement('button');
        sidebarBtn.className =
          'sidebar-toggle-btn custom-control-btn c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';

        let icon = document.createElement('i');
        icon.className = 'c-icon p-classic_nav__right__activity__icon c-icon--side-panel';
        sidebarBtn.appendChild(icon);

        div.appendChild(sidebarBtn);
        sidebarBtn.addEventListener('click', this.nextTheme.bind(this));

        this.controlsEnabled = true;
      }
    }, 1000);
  },

  // Toggle Sidebar
  toggleSidebar() {
    const sidebar = document.querySelector('.p-channel_sidebar');
    if (sidebar.style.display !== 'none') {
      sidebar.style.display = 'none';
      this.sidebarEnabled = true;
    } else {
      sidebar.style.display = 'flex';
      this.sidebarEnabled = false;
    }
  },

  // go fetch the next theme
  nextTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;

    document.dispatchEvent(new CustomEvent('ThemeChanged', {
      detail: window.themePresets[this.themes[this.currentTheme]],
    }));
  },

  loadMainWindowResources() {
    const prefsDialogInitializedIntervalMaxTries = 100;
    let prefsDialogInitializedIntervalCounter = 0;

    this.prefsDialogInitializedInterval = setInterval(() => {
      prefsDialogInitializedIntervalCounter++;
      if (prefsDialogInitializedIntervalCounter > prefsDialogInitializedIntervalMaxTries) {
        clearInterval(this.prefsDialogInitializedInterval);
        return;
      }

      this.sidebarLoaded = !!document.querySelector('.p-channel_sidebar__static_list');

      if (this.sidebarLoaded) {
        this.$sideBar = document.querySelector('.p-channel_sidebar__static_list');
        this.insertPluginSection();
        clearInterval(this.prefsDialogInitializedInterval);
      }

    }, 1000);
  },

  insertPluginSection() {
    const $pluginsSection = document.createElement('div');
    $pluginsSection.style.height = 26;
    $pluginsSection.attributes.role = 'listitem';
    $pluginsSection.addEventListener('click', () => {
      this.showPluginsUI();
    });

    const $pluginsLinkBtn = document.createElement('button');
    $pluginsLinkBtn.className = 'c-button-unstyled p-channel_sidebar__link p-channel_sidebar__section_heading_label position_relative';
    $pluginsLinkBtn.innerHTML = `
<i class="c-icon p-channel_sidebar__link__icon c-icon--list c-icon--inherit" type="list" aria-hidden="true"></i>
<span class="p-channel_sidebar__name">Plugins</span>`;

    $pluginsSection.appendChild($pluginsLinkBtn);
    this.$sideBar.append($pluginsSection);
  },

  showPluginsUI() {
    if (!this.pluginsUI) {
      this.pluginsUI = this.createPluginsUI();
    }
    document.body.append(this.pluginsUI);
  },

  createPluginsUI() {
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
    $closeBtn.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 13) {
        $wrapper.className += 'ReactModal__Content--before-close';
        $reactModal.remove();
      }
    });
    $closeBtn.addEventListener('click', () => {
      $wrapper.className += 'ReactModal__Content--before-close';
      $reactModal.remove();
    });

    // Header
    const $header = document.createElement('div');
    $header.className = 'c-sk-modal_header';
    $header.innerHTML = `
<div data-qa="invite_modal_header" class="c-sk-modal_title_bar c-sk-modal_title_bar--pad_right">
<div class="c-sk-modal_title_bar__text"><h1>Slack Tweaks</h1></div>
</div>`;

    // Finally the settings
    const $settings = this.createSettings();

    $wrapper.append($closeBtn);
    $wrapper.append($header);
    $wrapper.append($settings);

    // animatsia!
    requestAnimationFrame(() => $wrapper.className += ' ReactModal__Content--after-open');

    return $reactModal;
  },

  createSettings() {
    // Contents
    const $settings = document.createElement('div');
    $settings.className = 'c-sk-modal_content c-sk-modal_content--indicateBottom';

    // Wrapper
    const $settingsWrapper = document.createElement('div');
    $settingsWrapper.className = 'c-scrollbar c-scrollbar--inherit_size';
    $settingsWrapper.innerHTML = `<div data-qa="slack_kit_scrollbar" role="presentation" class="c-scrollbar__hider">
    <div role="presentation" class="c-scrollbar__child" style="width: 654px;">
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
    $pluginList.innerHTML = `<div role="list" class="c-virtual_list c-virtual_list--scrollbar c-scrollbar" style="width: 640px; height: 481px;">
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
    this.addPlugins($pluginListInner);

    return $settings;
  },

  // Add plugins to the UI
  addPlugins($container) {
    for (let [key, value] of Object.entries(this.plugins)) {
      if (!value) {
        continue;
      }

      const $checkbox = this.createOptionCheckbox({
        pluginName: value.name,
        pluginDesc: value.desc,
      });
      $container.append($checkbox);
    }
  },

  createOptionCheckbox({ pluginName, pluginDesc }) {
    // Label
    const $label = document.createElement('label');
    $label.className = 'c-label c-label--inline c-label--pointer';
    $label.innerHTML = `<span class="c-label__text" data-qa-label-text="true">${pluginDesc}</span>`;
    $label.htmlFor = pluginName;
    $label.title = pluginDesc;

    // Checkbox
    const $cb = document.createElement('input');
    $cb.className = 'c-input_checkbox';
    $cb.type = 'checkbox';
    $cb.id = pluginName;
    $cb.name = pluginName;
    $cb.checked = this.isPluginEnabled(pluginName);
    $label.append($cb);

    // Listen to events
    $cb.addEventListener('change', (event) => {
      const name = event.target.id;
      const value = !!event.target.checked;
      this.setPluginState(name, value);
    });

    return $label;
  },

  // Toggle plugin state
  setPluginState(name, value) {
    if (!this.plugins[name]) {
      this.plugins[name] = {
        name,
        desc: name,
        enabled: value,
      };
    }

    this.plugins[name].enabled = value;
    localStorage.setItem('slack_plugins', JSON.stringify(this.plugins));
  },

  // Whether a plugin is enabled
  isPluginEnabled(name) {
    if (!this.plugins[name]) {
      return false;
    }

    return this.plugins[name].enabled;
  },

  init() {
    let savedSettings = localStorage.getItem('slack_plugins');
    if (savedSettings) {
      this.plugins = Object.assign({}, this.plugins, JSON.parse(savedSettings));
    }

    this.loadMainWindowResources();

    // // Keyboard Shortcuts! Toggle Dark Mode (Cmd+D) & Toggle Sidebar (Cmd+B)
    // document.addEventListener('keydown', ({ keyCode, metaKey }) => {
    //   if (keyCode === 66 && metaKey) {
    //     this.toggleSidebar();
    //   }
    //   if (keyCode === 71 && metaKey) {
    //     this.toggleControls();
    //   }
    // });
  },
};

window.slackPlugins = slackPlugins;
window.slackPlugins.init();
