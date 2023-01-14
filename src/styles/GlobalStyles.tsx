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
          height: 100%;
          overflow: hidden;
        }
        body {
          height: 100%;
        }
        #__next {
          height: 100%;
        }
        a,
        a:hover,
        a:active {
          text-decoration: none;
          color: inherit;
          text-decoration: none;
          color: inherit;
        }
      `}
    />
  );
};

export default GlobalStyles;
