# mtslack (Material Themed Slack)

Beautify your Slack application from a list of popular themes!!!

Currently works only for Mac OS, Windows and Linux non-SNAP (Marketplace)

**Theme List**:

- Material Oceanic ![oceanic.png](doc/v2/oceanic.png)
- Material Darker ![darker.png](doc/v2/darker.png)
- Material Palenight ![palenight.png](doc/v2/palenight.png)
- Material Lighter ![lighter.png](doc/v2/lighter.png)
- Material DeepOcean ![deepocean.png](doc/v2/deepocean.png)
- Monokai Pro ![monokai.png](doc/v2/monokai.png)
- Arc Dark ![arcdark.png](doc/v2/arcdark.png)
- Dracula ![dracula.png](doc/v2/dracula.png)
- GitHub ![github.png](doc/v2/github.png)
- Atom One Dark ![onedark.png](doc/v2/onedark.png)
- Atom One Light ![onelight.png](doc/v2/onelight.png)
- Solarized Dark ![solardark.png](doc/v2/solardark.png)
- Solarized Light ![solarlight.png](doc/v2/solarlight.png)
- Night Owl ![nightowl.png](doc/v2/nightowl.png)
- Light Owl ![lightowl.png](doc/v2/lightowl.png)
- Moonlight (BETA) ![moonlight.png](doc/v2/moonlight.png)

----------------------------

# Pledge

If you like this plugin, you can buy me a beer (or a coffee, or something else)
using [PayPal](https://paypal.me/mallowigi?locale.x=en_US)

You can also support this theme by subscribing to the Material Theme
OpenCollective. [[Become a sponsor](https://opencollective.com/atom-material-themes-and-plugins#sponsor)]

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/atom-material-themes-and-plugins#backer)]

<a href="https://opencollective.com/atom-material-themes-and-plugins#backers" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/backers.svg?width=890"></a>

Check also : <https://www.material-theme.com/docs/support-us/>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your
website. [[Become a sponsor](https://opencollective.com/atom-material-themes-and-plugins#sponsor)]

<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/0/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/1/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/2/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/3/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/4/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/5/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/6/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/7/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/8/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/atom-material-themes-and-plugins/sponsor/9/website" target="_blank"><img src="https://opencollective.com/atom-material-themes-and-plugins/sponsor/9/avatar.svg"></a>

# Installation

### Global installation (works anywhere)

1. Run `npm install -g mtslack` in a terminal (or run `sudo npx mtslack` if you don't want to install it globally)
2. Run the command `sudo mtslack` (in Windows, you need to open the Terminal in Administrator Mode)
3. You will be prompted with a menu with two options:
    - Apply Theme
    - Remove Theme

4. Select *Apply Theme* to apply the theme.
5. Open or Restart (with Cmd-Q) Slack
6. ?????
7. PROFIT!!!!!!!

### Revert to the default theme

The best way to revert to the default theme would be to use the backup copy you made and overwrite the patched Slack.app

There is also a `Remove Theme` option in the menu but it is less robust.

### Updates

`mtslack` has an auto-update function. Whenever there is a new package available, a notification will appear on the
bottom on your Slack Window prompting you to run the `mtslack` command again to trigger the update. You will then need
to run the command again to apply the updates.

----

### Slack Tweaks

Since version 2.0 you can also profit from a bunch of **Slack Tweaks** to make the application more enjoyable. You can
find a button to open the Slack Tweaks on the channels sidebar.

#### Slack Tweak Control Panel

![Slack Tweaks](doc/v2/tweaksSettings.png)

This panel controls which tweak toggles are available. **This doesn't actually toggle the tweaks themselves!**.

Once you've enabled a tweak, a new toggle button will appear on the Channel Header. Pressing on these buttons will
activate the tweak.

You can also activate the toggle using a shortcut.

![Tweaks](doc/v2/tweaksToolbar.png)

These settings are saved in the application's Local Storage.

#### Modal Overlays (Ctrl+Alt+O)

This button will toggle an overlay to display whenever settings are open.

#### Presence Icons (Ctrl+Alt+P)

This button will restore the old school presence icons in the sidebar

#### Dim Absent People (Ctrl+Alt+D)

This button will dim absent people from the sidebar, making the present ones more prominent.

#### Loop Over selected themes (Ctrl+Alt+T)

This button will loop over the available themes, allowing you to choose a theme in realtime.

#### Toggle Custom Font (Ctrl+Alt+F)

Switch the fonts used in the app with the font you've defined in the Slack Tweak Settings.

#### Toggle Custom Monospace Font (Ctrl+Alt+M)

Switch the monospace font size and family used in the app with the font you've defined in the Slack Tweak Settings.

#### Accent Color (Ctrl+Alt+A)

Switch the current theme's accent color with the one of your choice. You can set the desired color in the Slack Tweak
Settings.

#### Links Color (Ctrl+Alt+L)

Switch the current theme's links color with the one of your choice. You can set the desired color in the Slack Tweak
Settings.

### Important Note!

Please note that these tweaks rely on modifying the app realtime. There's a high chance further updates from Slack would
break those tweaks. In this case please report to the repository, thanks!

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

To test your CSS, install a Stylish-like
extension (<https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en>)
then create a new style for slack and paste the CSS inside and save.

You should already see all your styles applied. Please note that there are some differences between the web app and the
native app.

### Using the Electron app

1. Run `npm run server` to run a local server
2. Run `watchStyles` or `watchScripts` to watch for changes in styles or code
3. Run `npm run local` to run `apply` with the styles pointing to localhost
4. Run `npm run debug`

**IMPORTANT**: Please make sure to have enabled "Disable cache when devtools is open" in Chrome Settings.

Also don't forget to re-apply the production styles before quitting :)

----
Instead of launching Slack normally, you'll need to enable developer mode to be able to inspect things.

* Mac: `export SLACK_DEVELOPER_MENU=true; open -a /Applications/Slack.app`

* Windows: `export SLACK_DEVELOPER_MENU=true;  ~/AppData/Local/slack.exe`

* Linux: Same as the others, but for Linux (depends whether installed from the Marketplace or from the Web)

# License

Apache 2.0

# Acknowledgements

Thanks to <https://github.com/widget-/slack-black-theme> for the idea!

# License

Apache 2.0
