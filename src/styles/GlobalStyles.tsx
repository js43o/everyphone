import { css, Global } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        html {
          font-family: 'Noto Sans KR', sans-serif;
          width: 100%;
          height: 100%;
        }
        body {
          width: 100%;
          height: 100%;
        }
        #__next {
          width: 100%;
          height: 100%;
        }
        a,
        a:hover,
        a:active {
          text-decoration: none;
          color: inherit;
          height: inherit;
        }
        ul,
        ol,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
