export const REPO = process.env.LOCALHOST
  ? 'http://localhost:8030/dist/slack.css'
  : `https://raw.githubusercontent.com/mallowigi/mtslack/master/dist/slack.min.css?cacheBuster=${Date.now()}`;
