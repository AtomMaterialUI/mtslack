# Slack Theme Collection

Beautify your Slack application from a list of popular themes!!!

Currently works only for Mac OS, Windows and Linux non-SNAP (Marketplace)

**Theme List**:
- Material Oceanic ![oceanic.png](doc/oceanic.png)
- Material Darker ![darker.png](doc/darker.png)
- Material Palenight ![palenight.png](doc/palenight.png)
- Material Lighter ![lighter.png](doc/lighter.png)
- Material DeepOcean ![deepocean.png](doc/deepocean.png)
- Monokai Pro ![monokai.png](doc/monokai.png)
- Arc Dark ![arcdark.png](doc/arcdark.png)
- Dracula ![dracula.png](doc/dracula.png)
- GitHub ![github.png](doc/github.png)
- Atom One Dark ![onedark.png](doc/onedark.png)
- Atom One Light ![onelight.png](doc/onelight.png)
- Solarized Dark ![solardark.png](doc/solardark.png)
- Solarized Light ![solarlight.png](doc/solarlight.png)
- Night Owl ![nightowl.png](doc/nightowl.png)
- Light Owl ![lightowl.png](doc/lightowl.png)

----------------------------

# Pledge

If you like this plugin, you can buy me a beer (or a coffee, or something else) using [PayPal](https://paypal.me/mallowigi?locale.x=en_US)

You can also support this theme by subscribing to the Material Theme OpenCollective. [[Become a sponsor](https://opencollective.com/material-theme-jetbrains#sponsor)]

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/material-theme-jetbrains#backer)]

<a href="https://opencollective.com/material-theme-jetbrains#backers" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/backers.svg?width=890"></a>

Check also : <http://www.material-theme.com/docs/support-us/>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/material-theme-jetbrains#sponsor)]

<a href="https://opencollective.com/material-theme-jetbrains/sponsor/0/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/1/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/2/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/3/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/4/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/5/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/6/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/7/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/8/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/material-theme-jetbrains/sponsor/9/website" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/sponsor/9/avatar.svg"></a>


# Installation

### Global installation (works anywhere)

1. Run `npm install -g mtslack` in a terminal
2. Run the command `mtslack`
3. PROFIT!!!

- You will be prompted with a menu with two options:
  - Apply Theme
  - Remove Theme

- Select *Apply Theme* to be prompted with a list of themes to choose with.
- Open or Restart (with Cmd-Q) Slack
- ?????
- PROFIT!!!!!!!


### From npm

- Clone this repository
- Install NodeJS if you didn't do it yet (<https://nodejs.org/en/download/>)
- Run `npm install`
- Run `npm run apply`
- Select **Apply** in the menu, then select a theme from the predefined themes.
- Open or Restart (with Cmd-Q) Slack
- ??????
- PROFIT!!!!!!

### Revert to the default theme

The best way to revert to the default theme would be to use the backup copy you made and overwrite the patched Slack.app

There is also a `Remove Theme` option in the menu but it is less robust.

----
### Slack Tweaks (Beta)

Since version 2.0 you can also profit from a bunch of **Slack Tweaks** to make the application more enjoyable.

![Slack Tweaks](doc/tweaks.png)

Enabling these tweaks create a new icon in the Slack Toolbar to toggle the desired tweaks.

More will come later!

**Note**
Currently switching between Slack Workspaces would restore the default behavior, e.g. the tweaks not showing in the app.

You can forcibly relaunch them by pressing Cmd+D (Alt-D on Windows/Linux).

**Note**:

These tweaks are currently in a very early release. It can causes some problems, especially every time Slack updates their application.



----
# Development

## Building styles

This project consists in two parts:
- The CLI, used for applying the styles
- The Styles, written with Sass (Node-sass)

The cli is found in the `lib` directory while the styles are found in the `styles` directory.

Then run `npm run styles` or `npm run debugStyles` to compile the scss files in `dist/slack.min.css` or `dist/slack.css`

## Apply the styles

### Using the WebApp

Open Slack on the browser. It has the useful Developer Tools available to them so you can debug with ease.

To test your CSS, install a Stylish-like extension (<https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en>) then create
a new style for slack and paste the CSS inside and save.

You should already see all your styles applied. Please note that there are some differences between the web app and the native app.

### Using the Electron app

TODO

----
Instead of launching Slack normally, you'll need to enable developer mode to be able to inspect things.

* Mac: `export SLACK_DEVELOPER_MENU=true; open -a /Applications/Slack.app`

* Linux: (todo)

* Windows: `export SLACK_DEVELOPER_MENU=true;  ~/AppData/Local/slack.exe`

# License

Apache 2.0

# Acknowledgements

Thanks to <https://github.com/widget-/slack-black-theme> for the idea!

# License

Apache 2.0
