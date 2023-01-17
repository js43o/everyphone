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
          text-decoration: none;
          color: inherit;
        }
        h1,
        h2,
        h3,
        h4 {
          font-weight: bold;
          margin: 1rem 0;
        }
        h1 {
          font-size: 1.75rem;
        }
        h2 {
          font-size: 1.5rem;
        }
        h3 {
          font-size: 1.25rem;
        }
        h4 {
          font-size: 1rem;
        }
        ul,
        ol,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        hr {
          width: 100%;
          border: none;
          border-top: 1px solid #eeeeee;
        }
        button {
          padding: 0;
          border: none;
          margin: 0;
        }
      `}
    />
  );
};

export default GlobalStyles;
