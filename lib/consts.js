const REPO = process.env.LOCALHOST
  ? 'http://localhost:8080/dist/slack.css'
  : `https://raw.githubusercontent.com/mallowigi/mtslack/master/dist/slack.min.css?cacheBuster=${Date.now()}`;

module.exports = {
  REPO,
};
