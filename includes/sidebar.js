// Sidebar.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

window.slackPluginsAPI.plugins.sidebar = {
  name: 'sidebar',
  desc: 'Toggle Sidebar',
  descLong: 'Show or hide the sidebar',
  enabled: true,
  callback: function () {
    // window.slackPluginsAPI.togglePlugin('$nextThemeBtn', 'nextTheme');
    this.toggle();
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

  init() {
    // Toggle Sidebar
    const $sidebarBtn = document.createElement('button');
    this.$sideBarBtn = $sidebarBtn;
    $sidebarBtn.className =
      'c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';
    $sidebarBtn.innerHTML = `<i class="c-icon c-icon--side-panel" type="side-panel" aria-hidden="true"></i>`;
    $sidebarBtn.addEventListener('click', this.toggleSidebar.bind(this));
    this.toggleDisplay($sidebarBtn, 'sidebar');

    let $header = document.querySelector('.p-classic_nav__right_header');
    if ($header) {
      // Add buttons
      $header.appendChild($sidebarBtn);
    }
  },

  toggle() {
    this.toggleDisplay(this.$sideBarBtn);
  },

  // Show/hide a toolbar button
  toggleDisplay(button) {
    if (this.enabled) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  },
};
