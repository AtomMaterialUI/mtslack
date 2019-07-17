exports.THEME_NAME = 'One Dark';

const theme = {
  primary: '#E5C17C',
  accent: '#568AF2',
  text: '#ABB2BF',
  background: '#282C34',
  backgroundElevated: '#3B4048',

  backgroundHover: '#525964',
  backgroundLight: '#AAA',
  backgroundBright: '#FFF',

  borderDim: '#666',
  borderBright: this.primary,

  textBright: '#FFF',
  textDim: '#555c69',
  textSpecial: this.primary,
  textAccent: this.textBright,

  scrollbarBackground: '#000',
  scrollbarBorder: this.primary,

  yellow: '#fc0',
  green: '#98C379',
  cyan: '#56B6C2',
  blue: '#61AFEF',
  purple: '#C678DD',
  red: '#E06C75',
  red2: '#BE5046',
  orange: '#D19A66',
  orange2: '#E5707B',
  gray: '#3E4451',
  silver: '#9da5b4',
  black: '#21252b',
};

exports.THEME_CSS = `
:root {
    /* Modify these to change your theme colors: */
   --primary: ${theme.primary};
   --accent: ${theme.accent};
   --text: ${theme.text};
   --background: ${theme.background};
   --background-elevated: ${theme.backgroundElevated};

   /* These should be less important: */
   --background-hover: ${theme.backgroundHover};
   --background-light: ${theme.backgroundLight};
   --background-bright: ${theme.backgroundBright};

   --border-dim: ${theme.borderDim};
   --border-bright: ${theme.borderBright};

   --text-bright: ${theme.textBright};
   --text-dim: ${theme.textDim};
   --text-special: ${theme.textSpecial};
   --text-accent: ${theme.textAccent};

   --scrollbar-background: ${theme.scrollbarBackground};
   --scrollbar-border: ${theme.scrollbarBorder};

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