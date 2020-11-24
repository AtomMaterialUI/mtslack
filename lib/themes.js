const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const themesYml = fs.readFileSync(path.resolve(__dirname, './themes.yml'), { flag: 'r' });
const allThemes = yaml.load(themesYml);
const themes = [...allThemes.material, ...allThemes.other];

const toTheme = (theme) => {
  return {
    name: theme.name,
    id: theme.className,
    primary: theme.attributes,
    primaryT: `${theme.attributes}70`,
    accent: theme.accent,
    accentT: `${theme.accent}70`,
    accent2: theme.keywords,
    accent2T: `${theme.keywords}70`,
    bg: theme.background,
    fg: theme.foreground,
    text: theme.text,
    selectBg: theme.selectBg,
    selectFg: theme.selectFg,
    selectFg2: theme.selectFg2,
    button: theme.button,
    secondBg: theme.second,
    disabled: theme.disabled,
    contrast: theme.contrast,
    active: theme.table,
    border: theme.border,
    hl: theme.hl,
    tree: theme.tree,
    notif: theme.notif,
    excluded: theme.excluded,

    yellow: theme.attributes,
    green: theme.strings,
    cyan: theme.operators,
    blue: theme.functions,
    purple: theme.keywords,
    red: theme.tags,
    red2: theme.tags,
    orange: theme.numbers,
    orange2: theme.numbers,
    gray: theme.comments,
    silver: theme.vars,
    black: theme.contrast,
  };
};

let currentTheme = toTheme(themes[0]);

const generateCSS = (theme) => {
  if (!theme) {
    return;
  }
  return `
:root {
  /* Modify these to change your theme colors: */
  --primary: ${theme.primary};
  --primaryT: ${theme.primaryT};
  --accent: ${theme.accent};
  --accentT: ${theme.accentT};
  --accent2: ${theme.accent2};
  --accent2T: ${theme.accent2T};
  --bg: ${theme.bg};
  --fg: ${theme.fg};
  --text: ${theme.text};
  --selectBg: ${theme.selectBg};
  --selectFg: ${theme.selectFg};
  --selectFg2: ${theme.selectFg2};
  --button: ${theme.button};
  --secondBg: ${theme.secondBg};
  --disabled: ${theme.disabled};
  --contrast: ${theme.contrast};
  --active: ${theme.active};
  --border: ${theme.border};
  --hl: ${theme.hl};
  --tree: ${theme.tree};
  --notif: ${theme.notif};
  --excluded: ${theme.excluded};

  --yellow: ${theme.yellow};
  --green: ${theme.green};
  --cyan: ${theme.cyan};
  --blue: ${theme.blue};
  --purple: ${theme.purple};
  --red: ${theme.red};
  --red2: ${theme.red2};
  --orange: ${theme.orange};
  --orange2: ${theme.orange2};
  --gray: ${theme.gray};
  --silver: ${theme.silver};
  --black: ${theme.black};
}
`;
};

const changeTheme = (themeName) => {
  const rawTheme = themes.find((theme) => theme.className === themeName);
  if (!rawTheme) {
    currentTheme = null;
  } else {
    currentTheme = toTheme(rawTheme);
  }
};

module.exports = {
  currentTheme,
  changeTheme,
  getCurrentTheme() {
    return currentTheme;
  },
  getThemeCSS() {
    return generateCSS(currentTheme);
  },
  getThemesCSS() {
    return themes.reduce((acc, item) => {
      if (!item) return acc;
      acc[item.className] = generateCSS(toTheme(item));
      return acc;
    }, {});
  },
};

changeTheme();
