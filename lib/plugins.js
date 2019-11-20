const slackPlugins = {
  // Initialize Buttons On Main Window
  initCustomControls() {

    this.customControlsInterval = setInterval(() => {
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

  toggleControls() {
    if (this.controlsEnabled) {
      clearInterval(this.customControlsInterval);
      document.querySelector('.p-classic_nav__right__custom_controls').remove();
      this.controlsEnabled = false;
    } else {
      this.initCustomControls();
    }
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

  nextTheme() {
    document.dispatchEvent(new CustomEvent('ThemeChanged', {
      detail: window.themePresets['nightowl'],
    }));
  },

  init() {
    // Initialize Custom Controls
    this.initCustomControls();

    // Keyboard Shortcuts! Toggle Dark Mode (Cmd+D) & Toggle Sidebar (Cmd+B)
    document.addEventListener('keydown', ({ keyCode, metaKey }) => {
      if (keyCode === 66 && metaKey) {
        this.toggleSidebar();
      }
      if (keyCode === 71 && metaKey) {
        this.toggleControls();
      }
    });
  },
};

window.slackPlugins = slackPlugins;
window.slackPlugins.init();
