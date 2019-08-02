# Slack Theme Collection

Customize your Slack with one of the provided themes.

Theme List:
- Atom One Dark

More to come!

----------------------------
# Preview

TODO

# Pledge

If you like this plugin, you can buy me a beer (or a coffee, or something else) using [PayPal](https://paypal.me/mallowigi?locale.x=en_US)

You can also support this theme by subscribing to the Material Theme OpenCollective. [[Become a sponsor](https://opencollective.com/material-theme-jetbrains#sponsor)]

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/material-theme-jetbrains#backer)]

<a href="https://opencollective.com/material-theme-jetbrains#backers" target="_blank"><img src="https://opencollective.com/material-theme-jetbrains/backers.svg?width=890"></a>

Check also : http://www.material-theme.com/docs/support-us/

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


# Installing into Slack

### For Slack > 4.0

- Clone this repository
- Install NodeJS if you didn't do it yet (<>https://nodejs.org/en/download/</>)
- Run `npm install`
- Run `npm run apply`
- Select **Apply** in the menu
- Open or Restart Slack
- ??????
- PROFIT!!!!!!

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

To test your CSS, install a Stylish-like extension (https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) then create
a new style for slack and paste the CSS inside and save.

You should already see all your styles applied. Please note that there are some differences between the web app and the native app.

### Using the Electron app

First of all install and run a web server

```
npm i -g http-server
http-server .
```

You can now have access to the current project directory. Particularly the `dist/slack.css` where the magic happens.

Then changes the url in `lib/consts.js` to point to `http://localhost:8080/dist/slack.css` to use your local styles.

----
Instead of launching Slack normally, you'll need to enable developer mode to be able to inspect things.

* Mac: `export SLACK_DEVELOPER_MENU=true; open -a /Applications/Slack.app`

* Linux: (todo)

* Windows: (todo)

#### Live Reload

In addition to running the required modifications, you will likely want to add auto-reloading:

```js
const cssPath = 'http://localhost:8080/dist/slack.css';

window.reloadCss = function() {
   const webviews = document.querySelectorAll(".TeamView webview");
   fetch(cssPath + '?zz=' + Date.now(), {cache: "no-store"}) // qs hack to prevent cache
      .then(response => response.text())
      .then(css => {
         console.log(css.slice(0,50));
         webviews.forEach(webview =>
            webview.executeJavaScript(`
               (function() {
                  let styleElement = document.querySelector('style#slack-custom-css');
                  styleElement.innerHTML = \`${css}\`;
               })();
            `)
         )
      });
};

fs.watchFile(cssPath, reloadCss);
```

# License

Apache 2.0

# Acknowledgements

Thanks to https://github.com/widget-/slack-black-theme for the idea!

# License

Apache 2.0
