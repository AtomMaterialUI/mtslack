// Sidebar.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class SidebarPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'sidebar';
    this.desc = 'Toggle Sidebar';
    this.longDescription = 'Show or hide the sidebar';
    this.enabled = true;
    this.shortcut = '';
    this.icon = 'side-panel';

    // Specific
    this.sidebarEnabled = true;

  }

  apply() {
    this.applySidebar();
  }

  saveSettings() {
    return {
      enabled: this.enabled,
      sidebarEnabled: this.sidebarEnabled
    };
  }

  onToolbarClick() {
    this.toggleSidebar();
  }

  /**
   * Toggle Sidebar
   */
  toggleSidebar() {
    this.sidebarEnabled = !this.sidebarEnabled;
    this.applySidebar();

    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  applySidebar() {
    const sidebar = document.querySelector('.p-workspace');
    if (this.sidebarEnabled) {
      sidebar.style.gridTemplateColumns = '0px auto';
    }
    else {
      sidebar.style.gridTemplateColumns = '220px auto';
    }
  }
}

window.slackPluginsAPI.plugins.sidebar = new SidebarPlugin();
