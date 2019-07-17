exports.THEME_NAME = 'One Dark';

exports.THEME_CSS = `
:root {
    /* Modify these to change your theme colors: */
   --primary: #E5C17C;
   --accent: #568AF2;
   --text: #ABB2BF;
   --background: #282C34;
   --background-elevated: #3B4048;

   /* These should be less important: */
   --background-hover: #525964;
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
`;