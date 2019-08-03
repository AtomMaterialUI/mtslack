exports.THEME_NAME = 'One Dark';

const theme = {
    primary: "#E5C17C",
    primaryT: "#E5C17C90",
    accent: "#2979ff",
    accentT: "#2979ff90",
    accent2: "#C679DD",
    accent2T: "#C679DD90",
    bg: "#282C34",
    fg: "#979FAD",
    text: "#767d8c",
    selectBg: "#3A3F4B",
    selectFg: "#FFF",
    button: "#3A3F4B",
    secondBg: "#2F333D",
    disabled: "#6B727D",
    contrast: "#21252B",
    active: "#383E49",
    border: "#282C34",
    hl: "#383D48",
    tree: "#3A3F4B70",
    notif: "#282C34",
    excluded: "#2f3240",

    yellow: "#E5C17C",
    green: "#98C379",
    cyan: "#56B6C2",
    blue: "#61AFEF",
    purple: "#C679DD",
    red: "#F07178",
    red2: "#BE5046",
    orange: "#D19A66",
    orange2: "#E5707B",
    gray: "#59626F",
    silver: "#ABB2BF",
    black: "#21252B",
};

exports.THEME_CSS = `
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