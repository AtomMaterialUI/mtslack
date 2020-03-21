// Sidebar.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

window.slackPluginsAPI.plugins.sidebar = {
  name: 'sidebar',
  desc: 'Toggle Sidebar',
  longDescription: 'Show or hide the sidebar',
  enabled: true,
  shortcut: '',
  icon: 'side-panel',

  sidebarEnabled: true,

  callback: function () {
    this.toggle();
  },

  // Toggle Sidebar
  toggleSidebar() {
    const sidebar = document.querySelector('.p-workspace');
    if (this.sidebarEnabled) {
      sidebar.style.gridTemplateColumns = '0px auto';
      this.sidebarEnabled = false;
    } else {
      sidebar.style.gridTemplateColumns = '220px auto';
      this.sidebarEnabled = true;
    }
  },

  init() {
    // Toggle Sidebar
    const $sidebarBtn = document.createElement('button');
    this.$el = $sidebarBtn;

    $sidebarBtn.className =
      'c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';
    this.addIcon($sidebarBtn);
    $sidebarBtn.addEventListener('click', this.toggleSidebar.bind(this));
    // Add tooltip
    window.slackPluginsAPI.addTooltip(this);

    // this.toggleDisplay($sidebarBtn, 'sidebar');

    let $header = document.querySelector('.p-classic_nav__right_header');
    if ($header) {
      // Add buttons
      $header.appendChild($sidebarBtn);
    }
  },

  toggle() {
    this.toggleDisplay(this.$el);
  },

  // Show/hide a toolbar button
  toggleDisplay(button) {
    if (this.enabled) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  },

  switch(enabled) {
    this.enabled = enabled;
    this.toggle();
  },

  addIcon(button) {
    button.innerHTML = `<i class="c-icon c-icon--${this.icon}" type="magic" aria-hidden="true"></i>`;
  }
};
