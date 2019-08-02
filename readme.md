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

### For Slack < 4.0
Find your Slack's application directory.

* Windows: `%homepath%\AppData\Local\slack\`
* Mac: `/Applications/Slack.app/Contents/`
* Linux: `/usr/lib/slack/` (Debian-based)


Open up the most recent version (e.g. `app-2.5.1`) then open
`resources\app.asar.unpacked\src\static\ssb-interop.js`

At the very bottom, add

```js
// First make sure the wrapper app is loaded
document.addEventListener("DOMContentLoaded", function() {

   // Then get its webviews
   let webviews = document.querySelectorAll(".TeamView webview");

   // Fetch our CSS in parallel ahead of time
   const cssPath = 'https://raw.githubusercontent.com/mallowigi/slack-one-dark-theme/master/custom.css';
   let cssPromise = fetch(cssPath).then(response => response.text());

   let customCustomCSS = `
   :root {
      /* Modify these to change your theme colors: */
     --primary: #E5C17C;
     --accent: #568AF2;
     --text: #ABB2BF;
     --background: #282C34;
     --background-elevated: #3B4048;

     /* These should be less important: */
     --background-hover: lighten(#3B4048, 10%);
     --background-light: #AAA;
     --background-bright: #FFF;

     --border-dim: #666;
     --border-bright: var(--primary);

     --text-bright: #FFF;
     --text-dim: #555c69;
     --text-special: var(--primary);
     --text-accent: var(--text-bright);

     --scrollbar-background: #000;
     --scrollbar-border: var(--primary);

     --yellow: #fc0;
     --green: #98C379;
     --cyan: #56B6C2;
     --blue: #61AFEF;
     --purple: #C678DD;
     --red: #E06C75;
     --red2: #BE5046;
     --orange: #D19A66;
     --orange2: #E5707B;
     --gray: #3E4451;
     --silver: #9da5b4;
     --black: #21252b;
      }
   `

   // Insert a style tag into the wrapper view
   cssPromise.then(css => {
      let s = document.createElement('style');
      s.type = 'text/css';
      s.innerHTML = css + customCustomCSS;
      document.head.appendChild(s);
   });

   // Wait for each webview to load
   webviews.forEach(webview => {
      webview.addEventListener('ipc-message', message => {
         if (message.channel == 'didFinishLoading')
            // Finally add the CSS into the webview
            cssPromise.then(css => {
               let script = `
                     let s = document.createElement('style');
                     s.type = 'text/css';
                     s.id = 'slack-custom-css';
                     s.innerHTML = \`${css + customCustomCSS}\`;
                     document.head.appendChild(s);
                     `
               webview.executeJavaScript(script);
            })
      });
   });
});
```

Notice that you can edit any of the theme colors using the custom CSS (for
the already-custom theme.) Also, you can put any CSS URL you want here,
so you don't necessarily need to create an entire fork to change some small styles.

That's it! Restart Slack and see how well it works.

NB: You'll have to do this every time Slack updates.

# Development

## Inspect

Open Slack on the browser. It has the useful Developer Tools available to them so you can debug with ease.

To test your CSS, install a Stylish-like extension (https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) then create
a new style for slack and paste the CSS inside and save.

# Acknowledgements

Thanks to https://github.com/widget-/slack-black-theme for the idea!

# License

Apache 2.0
